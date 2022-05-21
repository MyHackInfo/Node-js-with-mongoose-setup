const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

dotenv.config({path:'./config.env'});

// connection to mongoose with server
const db = process.env.DATABASE_URI.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(db, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(con => {
    console.log(con.connections);
    console.log('db connection sucess!')
})

const app = express();

// add middleware 
// using this middleware we can acess body data from post request
app.use(express.json());
app.use(morgan('tiny'));

// simple get request from brower
app.get('/', (req, res)=>{
    res.send('Its working..');
});

// get request with handle
app.get('/getData',(req, res)=>{
    res.status(200).json({
        status: 'success',
        data : {
            id:1,
            name:'narsi'
        }
    })
});


app.listen(process.env.PORT,()=>{
    console.log('server runing on ', process.env.PORT, "and user name id:", process.env.DATABASE_USER,db)
});