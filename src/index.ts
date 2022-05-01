import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middleware/error.middleware';
import config from './config';
import db from './database';

const PORT = config.port || 3000;

// create instance server
const app: Application = express();
// middleware to parse incoming requests
app.use(express.json());
// HTTP request logger middleware
app.use(morgan('common'));
// HTTP security middleware
app.use(helmet());
// middleware to apply the rate limmiting to all requests
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests',
});
app.use(limiter);

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  throw new Error('Error existe');
  res.json({
    message: 'Hello World',
  });
});

// post request
app.post('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World from post',
    data: req.body,
  });
});

// test db
db.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release();
      console.log(res.rows);
    })
    .catch((err) => {
      client.release();
      console.log(err.stack);
    });
});

app.use(errorMiddleware);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'Ohh You are lost!!!',
  });
});

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`);
});

export default app;
