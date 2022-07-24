import express from 'express';
import usersValidations from './middlewares/users.validations';
import authByToken from './middlewares/auth.validation';
import walletValidation from './middlewares/wallet.validations';
import investValidation from './middlewares/invest.validation';
import usersControllers from './controllers/users.controllers';
import shareControllers from './controllers/shares.controllers';
import walletControllers from './controllers/wallet.controllers';
import investControllers from './controllers/invest.controllers';
import apiControllers from './controllers/api.controllers';

const routes = express.Router();



// ---------------------------- USER ---------------------------------

routes.route('/login')
  .post(usersValidations.loginValidation, usersControllers.login);

routes.route('/cadastro')
  .post(usersValidations.singUpValidation, usersControllers.singUp);

routes.route('/cliente/:id')
  .get(authByToken, usersControllers.getById);

// ------------------------ INVESTIMENTO ----------------------------

routes.route('/investimentos/comprar')
  .post(authByToken, investValidation, investControllers.buy);

routes.route('/investimentos/vender')
  .post(authByToken, investValidation, investControllers.sell);

// --------------------------- ATIVOS -------------------------------

routes.route('/ativos')
  .get(authByToken, apiControllers.searchAll);

routes.route('/ativos/cliente/:clientId')
  .get(authByToken, shareControllers.getClientShares);

routes.route('/ativos/:id')
  .get(authByToken, shareControllers.getSharesById);

// --------------------------- CONTA -------------------------------

routes.route('/conta/deposito')
  .post(authByToken, walletValidation, walletControllers.deposit)
  .get(walletControllers.pdf);

routes.route('/conta/gerarBoleto')
  .get(walletControllers.makepdf)

routes.route('/conta/saque')
  .post(authByToken, walletValidation, walletControllers.withdraw);

routes.route('/conta/transferencia')
  .post(authByToken, walletValidation, walletControllers.transfer)

routes.route('/conta/:clientId')
  .get(authByToken, walletControllers.getBalance);

// ---------------------------- API ----------------------------------

routes.route('/api/empresa')
  .get(authByToken, apiControllers.searchAll)

routes.route('/api/cotacao/cd_acao/:cod')
  .get(authByToken, apiControllers.searchByName)

export default routes;
