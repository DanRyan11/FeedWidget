import express from 'express';
import { routes } from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const serverPort = process.env.PORT || 3333

app.listen( serverPort, () => {
    console.log('Server started on port '+serverPort);
})