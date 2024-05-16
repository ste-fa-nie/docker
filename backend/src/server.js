// server.js

const express = require('express');
const cadastrarUsuario = require('../procedures/POST/cadastrarUsuario');
const editarPerfil = require('../procedures/PUT/editarPerfil')
const { login } = require('../procedures/POST/login'); // Importe a função login
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

// Função assíncrona para enviar e-mails
async function sendEmails() {
  // Lógica para enviar e-mails
  console.log("E-mails enviados!");
}

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

// Rota para alterar um usuário existente
app.put('/usuarios/:id', async (req, res) => {
    const idUsuario = req.params.id;
    const novosDadosUsuario = req.body;
  
    try {
      const resultado = await editarPerfil.alterarUsuario(pool, idUsuario, novosDadosUsuario);
      res.json(resultado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

// Rota para fazer login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
  
    const usuario = await login(pool, email, senha);
  
    if (!usuario) {
      // Se as credenciais estiverem incorretas, retorne um erro 401
      return res.status(401).json({ error: 'E-mail ou senha incorretos' });
    }
  
    // Se as credenciais estiverem corretas, retorne o usuário
    res.json(usuario);
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

