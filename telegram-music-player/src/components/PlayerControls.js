import React from 'react';
import styles from './PlayerControls.module.css';

// Простые SVG иконки для кнопок
const PlayIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
const PauseIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
const NextIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>;
const PrevIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>;

const PlayerControls = ({ isPlaying, playPause, playNextTrack, playPreviousTrack }) => {
  return (
    <div className={styles.controls}>
      <button onClick={playPreviousTrack} className={styles.controlButton}>
        <PrevIcon />
      </button>
      <button onClick={playPause} className={`${styles.controlButton} ${styles.playButton}`}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button onClick={playNextTrack} className={styles.controlButton}>
        <NextIcon />
      </button>
    </div>
  );
};

export default PlayerControls;