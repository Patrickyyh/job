import express from 'express';

const app = express();

// middleware
notFoundMiddleWare
import notFoundMiddleWare from './middleware/not-found.js';

const port = process.env.PORT || 5001

app.get('/', (req,res) => {
    res.send('welcome');
})

app.use(notFoundMiddleWare)
app.listen(port , () => {   
    console.log(`Serving is listening on port ${port}....`);
})