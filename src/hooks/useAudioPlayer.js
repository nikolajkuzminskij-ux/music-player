import { useState, useEffect, useRef } from 'react';

// Массив треков. В будущем его можно загружать извне.
const initialTracks = [
  {
    id: 1,
    title: 'Low Life',
    artist: 'Future ft. The Weeknd',
    src: 'https://storage.yandexcloud.net/my-music-player/track1.mp3', // Пример URL
  },
  {
    id: 2,
    title: 'Air! No Time',
    artist: 'Future',
    src: 'https://storage.yandexcloud.net/my-music-player/track2.mp3',
  },
  // ... добавьте остальные треки из вашего списка
];

export const useAudioPlayer = () => {
  const [tracks] = useState(initialTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio());

  const currentTrack = tracks[currentTrackIndex];

  // Эффект для управления аудио тегом
  useEffect(() => {
    const audio = audioRef.current;
    audio.src = currentTrack.src;

    const setAudioData = () => {
      setDuration(audio.duration);
    };
    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };
    const handleEnded = () => {
      playNextTrack();
    };

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleEnded);

    if (isPlaying) {
      audio.play().catch(e => console.log("Автовоспроизведение заблокировано:", e));
    }

    // Очистка при размонтировании или смене трека
    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex, currentTrack.src]);

  // Эффект для паузы/воспроизведения
  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  const playPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    setIsPlaying(true); // Автоматически запускаем следующий трек
  };

  const playPreviousTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const setProgress = (e) => {
    const percent = e.target.value;
    const audio = audioRef.current;
    audio.currentTime = (percent / 100) * duration;
    setCurrentTime(audio.currentTime);
  };

  return {
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
  };
};