// server.js

const express = require('express');
const cadastrarUsuario = require('../procedures/POST/cadastrarUsuario');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: '35.171.73.11',
  port: 3307,
  user: 'root',
  password: '1234',
  database: 'cadastro',
  connectionLimit: 5
});

const cors = require('cors'); 

const app = express();

app.use(express.json());
app.use(cors()); 

app.post('/usuarios', async (req, res) => {
  const usuario = req.body;

  try {
    const resultado = await cadastrarUsuario.inserirUsuario(pool, usuario);
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

async function startServer() {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Servidor Express.js em execução na porta ${PORT}`);
  });

}

startServer();

