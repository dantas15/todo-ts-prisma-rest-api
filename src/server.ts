import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'express-async-errors';
import { router } from '@/routes';

const app = express();
app.disable('x-powered-by');

// Use the port in process.env.PORT if available
// otherwise use 3000
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log(`Running on http://localhost:${port} 🚀`);
});

export { app };
