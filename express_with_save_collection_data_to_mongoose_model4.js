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


// here is simple example of mongoose Schema with validation on type etc.
const tourSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "A tour must have a name"],
        unique:true
    },
    rating:{
        type:Number,
        default:4.5
    },
    price:{
        type:Number,
        required:[true, "a tour must need to price"]
    }
});

// create mongoose model using schema
const Tour = mongoose.model('narsi', tourSchema);

// this is model that have document data
const testTour = new Tour({
    name:"Fist class Tour with narsi 1",
    rating:4.2,
    price: 1300
});

// save this collection data on mongodb
testTour.save().then(doc => {
    console.log(doc);
}).catch(erro => {
    console.log("ERROR is: ", erro);
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
    console.log('server runing on ', process.env.PORT)
});