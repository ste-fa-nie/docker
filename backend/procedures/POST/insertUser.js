const mariadb = require('mariadb');
const { encrypt, decrypt } = require('./../../src/utils/encryption'); // Importando as funções de criptografia

const pool = mariadb.createPool({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '1234',
    database: 'usuario',
    connectionLimit: 5
});

async function getUsers() {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT nome, email, cpf FROM usuarios');
        return rows;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
}

async function insertUser(name, email, cpf) {
    let conn;
    try {
        conn = await pool.getConnection();
        
        // Criptografando os dados após a verificação do comprimento
        const encryptedName = encrypt(name);
        const encryptedEmail = encrypt(email);
        const encryptedCpf = encrypt(cpf);
        
        const query = 'INSERT INTO usuarios (nome, email, cpf) VALUES (?, ?, ?)';
        await conn.query(query, [encryptedName, encryptedEmail, encryptedCpf]);
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
}

module.exports = { getUsers, insertUser };
