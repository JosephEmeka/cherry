import express from 'express';
import mainRoutes from './mainRoute';


const app = express();
app.use(express.json());
app.use(mainRoutes);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

export default app;

