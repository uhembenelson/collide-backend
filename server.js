import express from 'express'; 
import bodyParser from 'body-parser'; 

import { MONGO_URL } from './config/db.js';
import mongoose from 'mongoose'; 
import cors from 'cors'; 
import { errorHandler } from './middleware/errorHandler.js';

const port = 5000; 

const app = express(); 


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    next(); 
}); 

//import routes 
import { userRoute } from './routes/userRoute.js';
import { courseRoute } from './routes/courseRoute.js';

//routes 
app.use('/user', userRoute)
app.use('/courses', courseRoute)


app.get('/', (req, res) => {
    res.send('Welcome to LMS!!!!')
}) 
app.use(errorHandler); 

//connect to mongodb 
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDataBase...'))
.catch(err => console.error('Could not connect to Mongo Database...'))

app.listen(process.env.PORT || port, () => {
    console.log(`LMS Server listenning at http://localhost: ${port}`)
})