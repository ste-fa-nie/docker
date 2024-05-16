// server.js

const express = require('express');
const cadastrarUsuario = require('../procedures/POST/cadastrarUsuario');
const mariadb = require('mariadb');

// Configure as credenciais de conexão com o banco de dados PostgreSQL
const pool = mariadb.createPool({
  host: '35.171.73.11',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'cadastro'
});

const cors = require('cors'); // Importe o pacote CORS

const app = express();

app.use(express.json());
app.use(cors()); // Use o middleware CORS

// Rota para inserir um novo usuário
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

// Função para iniciar o servidor
async function startServer() {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Servidor Express.js em execução na porta ${PORT}`);
  });

  // Aguarda o envio dos e-mails
  // await sendEmails();
}

// Inicia o servidor
startServer();

