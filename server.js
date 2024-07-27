import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import { env } from 'process';
import Auth from './backend/Auth.js';
import Game from './backend/Game.js';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Инициализация
const auth = new Auth();
const game = new Game();

// Настройка middleware для сессий
app.use(session({
  secret: env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Установите true, если вы используете HTTPS
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Обработчик для авторизации
app.get('/auth', async (req, res) => {
  const result = await auth.checkAuth(req.session);

  if(result === 'unauth') {
    res.send({ status: 'UnAuthorized' });
    return;
  }

  res.send({ status: 'authorized', user: result });
});

app.post('/auth', async (req, res) => {
  const { username, password } = req.body;
  const result = await auth.auth(username, password);
  
  if (result) {
    req.session.user = result.data;
    if(result.data) {
      delete result.data.password;
    }

    res.send({ user: result });
  } else {
    res.status(401).send('Неверные учетные данные');
  }
});

app.get('/coins', async (req, res) => {
  const result = await game.getCoins();

  res.send({ coins: result });
});

app.post('/hit', async (req, res) => {
  const { user } = req.session;
  const result = await game.hit(req.body, user);
  res.send({ hit: result });
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