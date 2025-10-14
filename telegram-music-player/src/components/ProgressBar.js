import React from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ currentTime, duration, setProgress }) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={styles.progressContainer}>
      <span className={styles.time}>{formatTime(currentTime)}</span>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={setProgress}
        className={styles.progressBar}
      />
      <span className={styles.time}>{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;