import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import path from 'path';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use('/api/media', express.static('/var/data/media'));
    app.use(express.static(path.join(__dirname, '/shop-client/build')));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'shop-client', 'build', 'index.html')));
} else {
    const __dirname = path.resolve();
    app.use('/api/media', express.static(path.join(__dirname, '/media')));
    app.get('/', (req, res) => {
        res.send('API is running ...');
    });
}

app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));
