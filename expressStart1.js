const express = require('express');

const app = express();

// add middleware 
// using this middleware we can acess body data from post request
app.use(express.json());

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

// get request data on server side like user id, name EventSource.
// only one data /:id
// one and more data /:id/:name etc.

app.get('/user/:id/:name',(req, res)=>{
    let id = req.params.id;
    let name = req.params.name;

    res.status(200).json({
        status:'sucess',
        data:{
            userId: id,
            userName : name
        }
    })
});

// this one for post request on express acess body data from post using middleware
app.post('/user/',(req,res)=>{
    console.log(req.body);
    let bodyData = req.body;
    res.status(200).json({
        status:'sucess',
        data: bodyData
    })
});

app.listen('8080',()=>{
    console.log('server runing on 8080..')
});