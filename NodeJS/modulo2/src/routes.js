/* eslint-disable new-cap */
const express = require('express');
const multerConfig = require('./config/multer');
const upload = require('multer')(multerConfig);

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

const authMiddleware = require('./app/middlewares/auth');
const guestMiddleware = require('./app/middlewares/guest');

const routes = express.Router();

routes.get('/', guestMiddleware, SessionController.create);
routes.post('/signin', SessionController.store);

routes.get('/signup', guestMiddleware, UserController.create);
routes.post('/signup', upload.single('avatar'), UserController.store);

routes.use('/app', authMiddleware);
routes.get('/app/logout', SessionController.destroy);

routes.get('/app/dashboard', (req, res) => {
  console.log(req.session.user);
  return res.render('dashboard');
});

module.exports = routes;
