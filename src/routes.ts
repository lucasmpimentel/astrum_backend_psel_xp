import express from 'express';
import usersValidations from './middlewares/users.validations';
import authByToken from './middlewares/auth.validation';
import usersControllers from './controllers/users.controllers';
import shareControllers from './controllers/shares.controllers';
import walletControllers from './controllers/wallet.controllers';
import apiControllers from './controllers/api.controllers';

const routes = express.Router();



// ---------------------------- USER ---------------------------------

routes.route('/login')
  .post(usersValidations.loginValidation, usersControllers.login);

routes.route('/cadastro').post();

routes.route('/cliente/:id')
  .get(authByToken, usersControllers.getById);

// ------------------------ INVESTIMENTO ----------------------------

routes.route('/investimento/comprar')
  .post(authByToken);

routes.route('/investimento/vender')
  .post(authByToken);

// --------------------------- ATIVOS -------------------------------

routes.route('/ativos')
  .get(authByToken);

routes
  .route('/ativos/cliente/:clientId')
  .get(authByToken, shareControllers.getClientShares);

routes.route('/ativos/:id')
  .get(authByToken, shareControllers.getSharesById);

// --------------------------- CONTA -------------------------------

routes.route('/conta/deposito')
  .post(authByToken);

routes.route('/conta/saque')
  .post(authByToken, walletControllers.withdraw);

routes.route('/conta/transferencia')
  .post(authByToken, walletControllers.transfer)

routes.route('/conta/:clientId')
  .get(authByToken, walletControllers.getBalance);

// ---------------------------- API ----------------------------------

routes.route('/api/carteira')
  .get(authByToken, apiControllers.searchAll)

routes.route('api/cotacao/cd_acao/:cod')
  .get(authByToken, apiControllers.searchByName)

routes.route('api/empresa/:id/cotacoes')
  .get(authByToken, apiControllers.searchById)

export default routes;
