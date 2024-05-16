const bcrypt = require('bcryptjs');
// const {insertUser} = require('./insertUser')

async function inserirUsuario(pool, usuario) {
  const { nome, sobrenome, email, senha, cpf, rua, numero, bairro, cidade, estado, pais, celular, termos } = usuario;

  try {
    const connection = await pool.getConnection();
    const hashedSenha = await bcrypt.hash(senha, 10); // Criptografa a senha com bcrypt

    const queryText = `
      INSERT INTO usuarios 
        (nome, sobrenome, email, senha, cpf, rua, numero, bairro, cidade, estado, pais, celular, termos) 
      VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [nome, sobrenome, email, hashedSenha, cpf, rua, numero, bairro, cidade, estado, pais, celular, termos];
    await connection.query(queryText, values);

    connection.release();
    // await insertUser(nome, email, cpf);

    return { success: true };
  } catch (error) {
    console.error('Erro ao inserir usuário no banco de dados:', error);
    return { error: 'Erro ao inserir usuário no banco de dados' };
  }
}



module.exports = { inserirUsuario };
