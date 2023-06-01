import  express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import routesUsrs from './routes/api.js';

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', routesUsrs);


const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`API is running on port ${PORT}`);
