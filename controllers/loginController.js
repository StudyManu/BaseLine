const path = require('path');
const LoginService = require('../services/loginService');

class LoginController {
  static getLoginPage(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'login', 'index.html'));
  }

  static async postLogin(req, res) {
    const { username, password } = req.body;

    try {
      const user = await LoginService.authenticateUser(username, password);

      if (!user) {
        return res.send('<h3>Usuário ou senha inválidos. <a href="/login">Tentar novamente</a></h3>');
      }

      req.session.userId = user.id;
      req.session.username = user.username;

      res.redirect('/home');
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).send('Erro interno do servidor');
    }
  }

  static getHomePage(req, res) {
    if (!req.session.userId) {
      return res.redirect('/login');
    }
    res.sendFile(path.join(__dirname, '..', 'public', 'home', 'index.html'));
  }

  static logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }
}

module.exports = LoginController;