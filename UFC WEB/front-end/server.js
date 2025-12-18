import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { conectarBanco } from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Teste de rota
app.get('/', (req, res) => {
  res.json({ message: 'API Jornal da UFC rodando!' });
});

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  await conectarBanco();
});