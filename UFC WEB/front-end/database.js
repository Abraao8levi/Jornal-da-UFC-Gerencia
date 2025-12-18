import pg from 'pg';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

let db;

export async function conectarBanco() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    // Conexão com Supabase (Postgres)
    console.log('Conectando ao Supabase (Postgres)...');
    const { Pool } = pg;
    db = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
    try {
      await db.connect();
      console.log('Conectado ao Supabase com sucesso.');
    } catch (error) {
      console.error('Erro ao conectar no Supabase:', error);
    }
  } else {
    // Conexão com SQLite (Local)
    console.log('Conectando ao SQLite (Local)...');
    db = await open({
      filename: './database.sqlite',
      driver: sqlite3.Database
    });
    console.log('Conectado ao SQLite com sucesso.');
  }
  
  return db;
}

export const getDb = () => db;