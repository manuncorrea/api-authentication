import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import routes from './routes';

import './database/connect';

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log('🔥 Server started at http://localhost:3333'));
//10:07