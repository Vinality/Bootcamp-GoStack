const routes = require('express').Router();
const SessionController = require('./app/controllers/SessionController');
const { User } = require('./app/models');

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Diego',
    email: 'diegod@email.com',
    password_hash: '1234'
  });

  return res.json({ user });
});

routes.post('/sessions', SessionController.store);

module.exports = routes;

