const express = require('express');
const router = express.Router();
const path = require('path');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');

router.get('/:page', (req, res) => {
  const page = req.params.page;

  const filePath = path.join(__dirname, 'views', page, 'index.html');

  res.sendFile(filePath, err => {
    if (err) {
      res.status(404).send('Página não encontrada');
    }
  });
});

router.get('/', (req, res) => {
  res.redirect('/login');
});


router.post('/login', loginController.postLogin);
router.get('/logout', loginController.logout);

router.post('/createUser', userController.create);
router.post('/listUsers', userController.listUsers);

module.exports = router;