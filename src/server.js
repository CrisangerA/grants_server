import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
//
import { connection } from './config/ormconnection';
import scrapRoutes from './routes/scrap.routes';
import grantRoutes from './routes/grants.routes';

// Initializations
connection();
const app = express();

// Settings 
app.set('port', process.env.PORT || 5328);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/api', scrapRoutes);
app.use('/api', grantRoutes);

export default app;