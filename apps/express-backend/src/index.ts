import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3001;
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import vendorRoutes from './routes/vendor.route'
import serverRoutes from './routes/server.route'
import productRoutes from './routes/product.route'
import categoryRoutes from './routes/category.route'
const morganFormat = ':method :url :status :response-time ms';

app.use(morgan(morganFormat));
app.use(helmet());

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/',serverRoutes);
app.use('/vendor/',vendorRoutes);
app.use('/product',productRoutes);
app.use('/category',categoryRoutes);
app.listen(port, () => console.log('> Server is up and running on port: ' + port));