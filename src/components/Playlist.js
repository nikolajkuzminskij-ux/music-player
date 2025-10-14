import React from 'react';
import styles from './Playlist.module.css';

const Playlist = ({ tracks, currentTrack, isVisible, onTrackClick, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.playlistOverlay}>
      <div className={styles.playlistHeader}>
        <h3>Playlist</h3>
        <button onClick={onClose} className={styles.closeButton}>✕</button>
      </div>
      <ul className={styles.playlist}>
        {tracks.map((track, index) => (
          <li
            key={track.id}
            className={`${styles.playlistItem} ${
              track.id === currentTrack.id ? styles.active : ''
            }`}
            onClick={() => onTrackClick(index)}
          >
            <span className={styles.trackTitle}>{track.title}</span>
            <span className={styles.trackArtist}>{track.artist}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;