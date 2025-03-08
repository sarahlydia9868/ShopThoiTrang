"use strict";
import express, { Application } from "express";
import morgan from 'morgan';
import cors from 'cors';
import { Server } from 'http';
import config from './util/config';
import { connectDataBase } from './util/database';
import { errorHandler, notFound } from './middleware/error';
import productRoutes from './routes/product';
import userRoutes from './routes/user';
import orderRoutes from './routes/order';
import uploadRoutes from './routes/upload';


const app: Application = express();

connectDataBase();

if (config.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/uploads', uploadRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT: number | string = config.PORT || 8000;


const server: Server = app.listen(PORT, () =>
    console.log(
        `🟢 Server running in ${config.NODE_ENV} mode on port ${PORT}`
    )
);