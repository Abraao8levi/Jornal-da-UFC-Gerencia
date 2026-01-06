const express = require('express');
const cors = require('cors');
const noticiaRoutes = require('./routes/noticiaRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas públicas
app.use('/api/auth', authRoutes);

// Rotas protegidas (requerem autenticação)
app.use('/api/noticias/admin', authMiddleware, noticiaRoutes);
app.use('/api/noticias/pendentes', authMiddleware, noticiaRoutes);
app.use('/api/noticias', noticiaRoutes); // Rotas públicas para listagem

// Rota de saúde
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend funcionando com Supabase' });
});

module.exports = app;
