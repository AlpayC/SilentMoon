import "./Player.css";
import PlayButton from "../PlayButton/PlayButton";
import SkipBackwards from "../SkipButtons/SkipBackwards";
import SkipForward from "../SkipButtons/SkipForward";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useRef, useState, useContext, useEffect } from "react";
import { UserDataContext } from "../../context/UserDataContext";
import axios from "axios";

const Player = ({ audioSrc, contentId, contentTitle, contentType = "meditation" }) => {
  const audioPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // überwacht ob das Lied abspielt
  const [isAudioReady, setIsAudioReady] = useState(false);
  // überwacht ob Audio Element bereit ist zum abspielen
  const [currentSongProgress, setCurrentSongProgress] = useState(0);
  // überwacht inwieweit Lied bereits abgespielt ist
  const [entireSongDuration, setEntireSongDuration] = useState(0);
  // Zustand für die gesamte Lieddauer
  const [sessionStartTime, setSessionStartTime] = useState(null);
  
  const { userData } = useContext(UserDataContext);

  // Handle component unmount (when user exits player)
  useEffect(() => {
    return () => {
      // Cleanup function runs when component unmounts
      if (sessionStartTime) {
        const sessionDuration = (Date.now() - sessionStartTime) / 1000;
        console.log("Component unmounting, session duration:", sessionDuration, "seconds");
        if (sessionDuration > 1) {
          // Use navigator.sendBeacon for reliable logging during page unload
          const storagedUserData = JSON.parse(
            sessionStorage.getItem("sessionedUserData")
          );
          const userId = userData?._id || storagedUserData?._id;
          
          if (userId) {
            const durationInMinutes = Math.max(1, Math.round(sessionDuration / 60));
            const sessionData = {
              _id: userId,
              duration: durationInMinutes,
              type: contentType,
              contentId,
              contentTitle
            };
            
            console.log("Logging session on unmount:", sessionData);
            
            // Use sendBeacon for reliability during page unload/navigation
            if (navigator.sendBeacon) {
              navigator.sendBeacon(
                '/api/user/logsession',
                new Blob([JSON.stringify(sessionData)], { type: 'application/json' })
              );
            } else {
              // Fallback for browsers without sendBeacon
              fetch('/api/user/logsession', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sessionData),
                keepalive: true
              }).catch(console.error);
            }
          }
        }
      }
    };
  }, [sessionStartTime, userData, contentType, contentId, contentTitle]);

  const onLoadedMetadata = (e) => {
    // erst wenn Metadaten geladen sind wird die gesamte Dauer des Liedes gespeichert
    const seconds = e.target.duration;
    setEntireSongDuration(seconds);
    setIsAudioReady(true); // erst wenn Audio komplett geladen ist, wird es auf bereit gesetzt
  };

  const onTimeUpdate = (e) => {
    // wird aufgerufen sobald sich die Zeit des Liedes verändert
    const currentTime = e.target.currentTime;
    setCurrentSongProgress(currentTime);
    // hiermit der im Zustand gespeichert wie weit die Abspieldauer ist
  };

  const logSession = async (duration) => {
    try {
      const storagedUserData = JSON.parse(
        sessionStorage.getItem("sessionedUserData")
      );
      const userId = userData?._id || storagedUserData?._id;
      if (!userId) {
        console.log("No userId found for session logging");
        return;
      }

      const durationInMinutes = Math.max(1, Math.round(duration / 60)); // At least 1 minute for short previews
      
      console.log("Logging session:", {
        userId,
        duration: durationInMinutes,
        type: contentType,
        contentId,
        contentTitle
      });

      await axios.post("/api/user/logsession", {
        _id: userId,
        duration: durationInMinutes,
        type: contentType,
        contentId,
        contentTitle
      });
      
      console.log("Session logged successfully");
    } catch (error) {
      console.error("Error logging session:", error);
    }
  };

  const onPlayButtonToggle = () => {
    if (isAudioReady) {
      // doppelte Abfrage so dass wenn Audioelement bereit ist, play und pause ausgeführt werden können
      const shouldPlay = !isPlaying;
      // wenn Lied läuft isPlaying = true / should play auf false
      if (shouldPlay) {
        audioPlayerRef.current.play();
        // Start tracking session time
        const startTime = Date.now();
        setSessionStartTime(startTime);
        console.log("Started session tracking at:", startTime);
      } else {
        audioPlayerRef.current.pause();
        // Log session if we were playing
        if (sessionStartTime) {
          const sessionDuration = (Date.now() - sessionStartTime) / 1000; // in seconds
          console.log("Session duration:", sessionDuration, "seconds");
          if (sessionDuration > 1) { // Only log if played for more than 1 second
            logSession(sessionDuration);
          } else {
            console.log("Session too short, not logging");
          }
          setSessionStartTime(null);
        }
      }
    }
  };

  const onTimeProgressChangeRequest = (newSongProgressValue) => {
    // durch ein Request kommt die aktuelle Spieldauer zurück so dass immer der aktuelle Wert der tatsächlichen Spieldauer entspricht
    audioPlayerRef.current.currentTime = newSongProgressValue;
  };

  const handleSkipForward = () => {
    audioPlayerRef.current.currentTime += 15;
    // aktuelle Zeit + 15 Sek
  };

  const handleSkipBackward = () => {
    audioPlayerRef.current.currentTime -= 15;
    // aktuelle Zeit - 15 Sek
  };

  return (
    <>
      <div>
        <div className="player-input-box">
          <div className="SkipPlayPause">
            <SkipBackwards onSkipBackward={handleSkipBackward} />
            <PlayButton isPlaying={isPlaying} onToggle={onPlayButtonToggle} />
            <SkipForward onSkipForward={handleSkipForward} />
          </div>
          <ProgressBar
            timeProgress={currentSongProgress}
            duration={entireSongDuration}
            onTimeProgressChangeRequest={onTimeProgressChangeRequest}
          />

          <audio
            hidden
            ref={audioPlayerRef}
            onLoadedMetadata={onLoadedMetadata}
            onTimeUpdate={onTimeUpdate}
            onPlay={() => {
              setIsPlaying(true);
              // Start session tracking for autoplay
              if (!sessionStartTime) {
                const startTime = Date.now();
                setSessionStartTime(startTime);
                console.log("Started session tracking (autoplay) at:", startTime);
              }
            }}
            onPause={() => {
              setIsPlaying(false);
              // Log session when paused
              if (sessionStartTime) {
                const sessionDuration = (Date.now() - sessionStartTime) / 1000;
                console.log("Session duration (pause):", sessionDuration, "seconds");
                if (sessionDuration > 1) {
                  logSession(sessionDuration);
                } else {
                  console.log("Session too short, not logging");
                }
                setSessionStartTime(null);
              }
            }}
            onEnded={() => {
              // Log session when audio ends naturally
              if (sessionStartTime) {
                const sessionDuration = (Date.now() - sessionStartTime) / 1000;
                if (sessionDuration > 1) {
                  logSession(sessionDuration);
                }
                setSessionStartTime(null);
              }
              setIsPlaying(false);
            }}
            controls // Attribut für Steuerelemente
            autoPlay // autoplay wenn Lied geladen ist
            load="auto" // Lied wird automatisch geladen
            preload="auto" // Attribut gibt nochmal zusätzlich mit an das Lied erst abspeilt wenn es komplett gealden ist
          >
            {audioSrc && <source src={audioSrc} type="audio/mp3" />}
            {/*             source mit Audioelement Prop wird nur gerendert wenn Audioelement vorhanden ist */}
          </audio>
        </div>
      </div>
    </>
  );
};

export default Player;
