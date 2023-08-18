import React from "react";
import { useEffect } from "react";

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
}) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  useEffect(() => {
    if (currentTrack) {
      audioRef.current.src = currentTrack.preview_url;
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentTrack, audioRef]);

  return (
    <div>
      <div className="text">
        <p className="title">{currentTrack.title}</p>
      </div>
      <audio ref={audioRef} onLoadedMetadata={onLoadedMetadata} controls />
      {/* <source src={track.preview_url} type="audio/mp3" /> */}
      {/* <p>0rSpNi9235sKXcd2wBaMkz</p> */}
    </div>
  );
};

export default DisplayTrack;
