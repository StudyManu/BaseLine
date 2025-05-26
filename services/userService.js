const pool = require('../db/db');
const bcrypt = require('bcrypt');

class userService {
    static async create({ nome, email, password }) {
        const hash = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)';
        await pool.query(query, [nome, email, hash]);
    }

    static async getAllUsers() {
        const result = await pool.query('SELECT id, nome, email FROM usuarios');

        return result.rows;
    }
}

module.exports = userService;