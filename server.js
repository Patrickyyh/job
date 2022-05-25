import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import morgan from 'morgan';


// DB and authenticateUser
import connectDB from './db/connect.js'

// routes 
import authRouter from './routes/authRoutes.js'
import jobRouter from './routes/jobRoutes.js'


dotenv.config();
const app = express();
// app.use(cors())

// middleware
import notFoundMiddleWare from './middleware/not-found.js';
import { errorHandlerMiddle } from './middleware/error-handler.js';

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'));
}

app.use(express.json()); 

const port = process.env.PORT || 5001

app.get('/', (req,res) => {
    // throw new Error('error')
    res.json({msg: 'Welcome'})
})

console.log("hellow"); 
app.use('/api/v1/auth',authRouter); 
app.use('/api/v1/jobs',jobRouter); 

app.use(notFoundMiddleWare)
app.use(errorHandlerMiddle)

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port , () => {   
            console.log(`Serving is listening on port ${port}....`);
        })
    } catch (error) {
        console.log(error);  
    }
}

start(); 