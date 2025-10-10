const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const MUSIC_FOLDER = './music'; // Путь к папке с музыкой

// Middleware
app.use(cors());
app.use(express.json());

// Функция для получения информации о аудиофайлах
function getAudioDuration(filePath) {
    return new Promise((resolve) => {
        // Здесь можно использовать библиотеку node-id3 для получения точной длительности
        // Для простоты возвращаем приблизительное значение или "0:00"
        resolve("0:00");
    });
}

// API endpoint для получения списка треков
app.get('/api/tracks', async (req, res) => {
    try {
        const tracks = [];
        const files = fs.readdirSync(MUSIC_FOLDER);
        
        for (const file of files) {
            if (file.match(/\.(mp3|wav|ogg|m4a)$/i)) {
                const filePath = path.join(MUSIC_FOLDER, file);
                const stats = fs.statSync(filePath);
                
                // Извлекаем название и артиста из имени файла
                const fileName = path.parse(file).name;
                const [artist, ...titleParts] = fileName.split(' - ');
                const title = titleParts.join(' - ') || fileName;
                
                tracks.push({
                    title: title,
                    artist: artist || 'Unknown Artist',
                    src: `/api/music/${file}`,
                    duration: "0:00", // Можно заменить на реальную длительность
                    cover: '/api/covers/default.jpg' // Заглушка для обложки
                });
            }
        }
        
        res.json(tracks);
    } catch (error) {
        console.error('Error reading music folder:', error);
        res.status(500).json({ error: 'Unable to read music folder' });
    }
});

// Endpoint для обслуживания музыкальных файлов
app.get('/api/music/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(MUSIC_FOLDER, filename);
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }
    
    // Определяем MIME-тип
    const ext = path.extname(filename).toLowerCase();
    const mimeTypes = {
        '.mp3': 'audio/mpeg',
        '.wav': 'audio/wav',
        '.ogg': 'audio/ogg',
        '.m4a': 'audio/mp4'
    };
    
    res.setHeader('Content-Type', mimeTypes[ext] || 'audio/mpeg');
    
    // Стримим файл
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
});

// Endpoint для обложек (заглушка)
app.get('/api/covers/:filename', (req, res) => {
    // Здесь можно добавить реальные обложки или использовать заглушку
    res.sendFile(path.join(__dirname, 'default-cover.jpg'));
});

// Обслуживание статических файлов (HTML, CSS, JS)
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`🎵 Music server running on http://localhost:${PORT}`);
    console.log(`📁 Serving music from: ${path.resolve(MUSIC_FOLDER)}`);
});
