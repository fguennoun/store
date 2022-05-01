import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const PORT = 3000;

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
  res.json({
    message: 'Hello World',
  });
});

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`);
});

export default app;
