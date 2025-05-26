const pool = require('../db/db');
const bcrypt = require('bcrypt');

class LoginService {
  static async authenticateUser(username, password) {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [username]);
    if (result.rows.length === 0) return null;

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.senha);
    if (!match) return null;

    return user;
  }
}

module.exports = LoginService;