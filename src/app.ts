import express, {
  type Request,
  type Response,
  type Application,
} from 'express';

import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';

const app: Application = express();

app.use(express.json());

// main entry point of API
app.use('/api/v1', router);

// for error handling
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

// ✅testing the server
app.get('/', (req: Request, res: Response) => {
  res.send('Hello social media apps testing!!');
});

export default app;
