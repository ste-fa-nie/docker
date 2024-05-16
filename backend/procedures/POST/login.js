// login.js

const bcrypt = require('bcryptjs');

async function login(pool, email, senha) {
  try {
    const client = await pool.connect();

    // Consulta para obter o usuário com o e-mail fornecido
    const queryText = 'SELECT * FROM public.usuarios WHERE email = $1';
    const { rows } = await client.query(queryText, [email]);

    if (rows.length === 0) {
      // Se o usuário não existe, retorne null
      return null;
    }

    const usuario = rows[0];

    // Verifique se a senha fornecida corresponde à senha armazenada no banco de dados
    const senhaCorrespondente = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorrespondente) {
      // Se a senha não corresponde, retorne null
      return null;
    }

    // Se as credenciais estiverem corretas, retorne o usuário
    return usuario;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return null;
  }
}

module.exports = { login };
