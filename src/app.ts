import express, {
  type Request,
  type Response,
  type Application,
} from 'express';

import router from './app/routes';

const app: Application = express();

app.use(express.json());

// main entry point of API
app.use('/api/v1', router);

// ✅testing the server
app.get('/', (req: Request, res: Response) => {
  res.send('Hello social media apps testing!!');
});

export default app;
