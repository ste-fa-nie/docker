CREATE DATABASE IF NOT EXISTS cadastro;
USE cadastro;
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    sobrenome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(100),
    cpf VARCHAR(14) UNIQUE,
    rua VARCHAR(100),
    numero VARCHAR(10),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(100),
    pais VARCHAR(100),
    celular VARCHAR(20),
    termos BOOLEAN
);
