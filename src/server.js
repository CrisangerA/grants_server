import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
//
import scrapRoutes from './routes/scrap.routes';

// Initializations
const app = express();

// Settings 
app.set('port', process.env.PORT || 5328);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/api', scrapRoutes)
export default app;