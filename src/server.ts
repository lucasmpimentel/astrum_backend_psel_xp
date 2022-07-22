import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import 'dotenv/config';
import routes from './routes';
import error from './middlewares/error.middleware';

const app = express();

const PORT = Number(process.env.PORT);
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);
app.use(error);

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
