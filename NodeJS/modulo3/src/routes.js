/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require('express');
const routes = express.Router();
const validate = require('express-validation');
const handle = require('express-async-handler');

const controllers = require('./app/controllers');
const validators = require('./app/validators');
const authMiddleware = require('./app/middlewares/auth');

routes.post('/users', validate(validators.User), handle(controllers.UserController.store));
routes.post('/sessions', validate(validators.Session), handle(controllers.SessionController.store));

routes.use(authMiddleware);

// Rotas de ads
routes.get('/ads', handle(controllers.AdController.index));
routes.get('/ads/:id', handle(controllers.AdController.show));
routes.post('/ads', validate(validators.Ad), handle(controllers.AdController.store));
routes.put('/ads/:id', validate(validators.Ad), handle(controllers.AdController.update));
routes.delete('/ads/:id', handle(controllers.AdController.destroy));

// Rotas de compras
routes.post('/purchase', validate(validators.Purchase), handle(controllers.PurchaseController.store));
routes.get('/purchase', handle(controllers.PurchaseController.index));
routes.post('/accept/', handle(controllers.PurchaseController.accept));

module.exports = routes;
