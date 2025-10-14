import React, { useEffect } from 'react';
import Player from './components/Player';
import './App.css';

// Импортируем SDK Telegram Web Apps
import WebApp from '@twa-dev/sdk';

function App() {
  useEffect(() => {
    // Инициализируем приложение Telegram
    WebApp.ready(); // Сообщаем Telegram, что приложение готово к отображению.
    // Можно также расширить интерфейс на весь экран:
    WebApp.expand();
  }, []);

  return (
    <div className="App">
      <Player />
    </div>
  );
}

export default App;