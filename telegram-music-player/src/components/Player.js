import React, { useState } from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';
import Playlist from './Playlist';
import styles from './Player.module.css';

const Player = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    playPause,
    playNextTrack,
    playPreviousTrack,
    setProgress,
    tracks,
    setCurrentTrackIndex,
  } = useAudioPlayer();

  const [isPlaylistVisible, setIsPlaylistVisible] = useState(false);

  const handleTrackClick = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaylistVisible(false); // Закрываем плейлист после выбора трека
  };

  return (
    <div className={styles.player}>
      {/* Заголовок как на картинке */}
      <div className={styles.nowPlaying}>
        <span>PLAYING NOW</span>
        <h2>EVOL. FUTURE</h2>
      </div>

      {/* Область с виниловой пластинкой (заглушка) */}
      <div className={styles.artwork}>
        <div className={styles.vinyl}></div>
      </div>

      {/* Информация о треке */}
      <div className={styles.trackInfo}>
        <h1 className={styles.trackTitle}>{currentTrack.title}</h1>
        <p className={styles.trackArtist}>{currentTrack.artist}</p>
      </div>

      {/* Прогресс-бар */}
      <ProgressBar currentTime={currentTime} duration={duration} setProgress={setProgress} />

      {/* Управление воспроизведением */}
      <PlayerControls
        isPlaying={isPlaying}
        playPause={playPause}
        playNextTrack={playNextTrack}
        playPreviousTrack={playPreviousTrack}
      />

      {/* Кнопка для открытия плейлиста */}
      <button
        className={styles.playlistButton}
        onClick={() => setIsPlaylistVisible(true)}
      >
        PLAYLIST
      </button>

      {/* Скрывающийся плейлист */}
      <Playlist
        tracks={tracks}
        currentTrack={currentTrack}
        isVisible={isPlaylistVisible}
        onTrackClick={handleTrackClick}
        onClose={() => setIsPlaylistVisible(false)}
      />
    </div>
  );
};

export default Player;