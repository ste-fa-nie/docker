async function alterarUsuario(pool, idUsuario, novosDadosUsuario) {
    const { nome, sobrenome, email, senha, cpf, rua, numero, bairro, cidade, estado, pais, celular, termos } = novosDadosUsuario;
  
    try {
      const client = await pool.connect();
  
      const queryText = `
        UPDATE public.usuarios
        SET nome = $1, sobrenome = $2, email = $3, senha = $4, cpf = $5,
            rua = $6, numero = $7, bairro = $8, cidade = $9, estado = $10,
            pais = $11, celular = $12, termos = $13
        WHERE id = $14
      `;
      const values = [nome, sobrenome, email, senha, cpf, rua, numero, bairro, cidade, estado, pais, celular, termos, idUsuario];
      await client.query(queryText, values);
  
      client.release();
  
      return { success: true };
    } catch (error) {
      console.error('Erro ao alterar dados do usuário:', error);
      return { error: 'Erro ao alterar dados do usuário' };
    }
  }
  
  module.exports = { alterarUsuario };