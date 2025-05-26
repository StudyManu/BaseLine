const userService = require('../services/userService');

class userController {
  static async create(req, res) {
    try {
      const { nome, email, password } = req.body;
      
      await userService.create({ nome, email, password });

      res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
      res.status(400).send(error.message || 'Erro ao cadastrar usuário.');
    }
  }

  static async listUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }
}

module.exports = userController;