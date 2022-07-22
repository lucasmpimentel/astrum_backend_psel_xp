import express from 'express';

const routes = express.Router();

routes.route('/login')
  .post()

export default routes;
