import React, { useState } from 'react';
import axios from 'axios'; // Importe a biblioteca Axios

function FormularioUsuario() {
  const [usuario, setUsuario] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    cpf: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    pais: '',
    celular: '',
    termos: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUsuario(prevUsuario => ({
      ...prevUsuario,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Faça uma requisição POST para a rota /usuarios do backend
      const response = await axios.post('http://35.171.73.11:3001/usuarios', usuario);
      console.log(response.data); // Exiba a resposta do servidor no console
    } catch (error) {
      console.error('Erro ao enviar dados do usuário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos do formulário */}
      <input type="text" name="nome" value={usuario.nome} onChange={handleChange} placeholder="Nome" required />
      <input type="text" name="sobrenome" value={usuario.sobrenome} onChange={handleChange} placeholder="Sobrenome" required />
      <input type="email" name="email" value={usuario.email} onChange={handleChange} placeholder="E-mail" required />
      <input type="password" name="senha" value={usuario.senha} onChange={handleChange} placeholder="Senha" required />
      <input type="text" name="cpf" value={usuario.cpf} onChange={handleChange} placeholder="CPF" required />
      <input type="text" name="rua" value={usuario.rua} onChange={handleChange} placeholder="Rua" required />
      <input type="text" name="numero" value={usuario.numero} onChange={handleChange} placeholder="Número" required />
      <input type="text" name="bairro" value={usuario.bairro} onChange={handleChange} placeholder="Bairro" required />
      <input type="text" name="cidade" value={usuario.cidade} onChange={handleChange} placeholder="Cidade" required />
      <input type="text" name="estado" value={usuario.estado} onChange={handleChange} placeholder="Estado" required />
      <input type="text" name="pais" value={usuario.pais} onChange={handleChange} placeholder="País" required />
      <input type="text" name="celular" value={usuario.celular} onChange={handleChange} placeholder="Celular" required />
      <label>
        <input type="checkbox" name="termos" checked={usuario.termos} onChange={handleChange} /> Aceitar termos e condições
      </label>
      
      <button type="submit">Enviar</button>
    </form>
  );
}

export default FormularioUsuario;
