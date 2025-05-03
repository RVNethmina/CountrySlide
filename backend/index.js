import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import UserRouter from './routes/userRouter.js';
import CountryRouter from './routes/countryRouter.js';


//app config
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/user',UserRouter);
app.use('/api/countries',CountryRouter);

app.get('/', (req, res) => {
    res.send("API is running successfully")
})

//server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

export default app;