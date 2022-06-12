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


// for deployment 
import {dirname} from 'path'
import {fileURLToPath} from 'url'
import path from 'path'

// sercurity protection middleware
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit';




dotenv.config();
const app = express();
// app.use(cors())

// middleware
import notFoundMiddleWare from './middleware/not-found.js';
import { errorHandlerMiddle } from './middleware/error-handler.js';
import authenticateUser from "./middleware/auth.js";


if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'));
}

// for deployment 
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname,'./client/build')))

// Security Protection 

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());



// set up the port over here
const port = process.env.PORT || 5001

app.get('/', (req,res) => {
    // throw new Error('error')
    res.json({msg: 'Welcome'})
})

 

// set up the routes
app.use('/api/v1/auth',authRouter); 
app.use('/api/v1/jobs',authenticateUser,jobRouter); 


// For deployment
app.get('*' , (req,res)=>{
    res.sendFile(path.resolve(__dirname ,'./client/build','index.html'))
})



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
