import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './controllers';

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
  console.log(`Servidor rodando no link http://localhost:${port}`);
});
