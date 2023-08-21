import "./Player.css";
import PlayButton from "../PlayButton/PlayButton";
import SkipBackwards from "../SkipButtons/SkipBackwards";
import SkipForward from "../SkipButtons/SkipForward";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useRef, useState } from "react";

const Player = ({ audioSrc }) => {
  const audioPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // überwacht ob das Lied abspielt
  const [isAudioReady, setIsAudioReady] = useState(false);
  // überwacht ob Audio Element bereit ist zum abspielen
  const [currentSongProgress, setCurrentSongProgress] = useState(0);
  // überwacht inwieweit Lied bereits abgespielt ist
  const [entireSongDuration, setEntireSongDuration] = useState(0);
  // Zustand für die gesamte Lieddauer

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

  const onPlayButtonToggle = () => {
    if (isAudioReady) {
      // doppelte Abfrage so dass wenn Audioelement bereit ist, play und pause ausgeführt werden können
      const shouldPlay = !isPlaying;
      // wenn Lied läuft isPlaying = true / should play auf false
      if (shouldPlay) {
        audioPlayerRef.current.play();
      } else {
        audioPlayerRef.current.pause();
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
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
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
