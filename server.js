import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import { env } from 'process';
import Auth from './backend/Auth.js';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Инициализация
const auth = new Auth();

// Настройка middleware для сессий
app.use(session({
  secret: env.SESSION_KEY, // Замените на ваш секретный ключ
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Установите true, если вы используете HTTPS
}));

app.use(express.static(path.join(__dirname, 'public')));

// Обработчик для авторизации
app.get('/auth', async (req, res) => {
  const result = await auth.checkAuth(req.session);

  if(result === 'unauth') {
    res.send({ status: 'UnAuthorized' });
    return;
  }
});

// Обработчик для выхода из системы
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Не удалось выйти из системы.');
    }
    res.send('Вы вышли из системы.');
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});