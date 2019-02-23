/* eslint-disable new-cap */
const express = require('express');
const routes = express.Router();

const controllers = require('./app/controllers');
const authMiddleware = require('./app/middlewares/auth');

routes.post('/users', controllers.UserController.store);
routes.post('/sessions', controllers.SessionController.store);

routes.use(authMiddleware);

// Rotas de ads

routes.get('/ads', controllers.AdController.index);
routes.get('/ads/:id', controllers.AdController.show);
routes.post('/ads', controllers.AdController.store);
routes.put('/ads/:id', controllers.AdController.update);
routes.delete('/ads/:id', controllers.AdController.destroy);

module.exports = routes;
