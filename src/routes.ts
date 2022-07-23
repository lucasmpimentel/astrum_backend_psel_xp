import express from 'express';
import usersValidations from './middlewares/users.validations';
import authByToken from './middlewares/auth.validation';
import usersControllers from './controllers/users.controllers';

const routes = express.Router();

routes.route('/login')
  .post(usersValidations.loginValidation, usersControllers.login)

routes.route('/cliente/:id')
  .get(authByToken, usersControllers.getById)

routes.route('/investimento/comprar')
  .post()

routes.route('/investimento/vender')
  .post()

routes.route('/ativos/:clientId')
  .get(authByToken, )

routes.route('/ativos/:id')
  .get()

routes.route('/conta/deposito')
  .post()

routes.route('/conte/saque')
  .post()

routes.route('/conta/:clientId')
  .get()



export default routes;
