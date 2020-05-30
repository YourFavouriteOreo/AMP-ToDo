const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const todoRoutes = require('./api/routes/todo');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb://localhost:27017',(err)=> {
    if(err){
        console.log(err);
    }
    else {
        console.log("Connected to Mongo DB");
        const app = express();
        const port = process.env.PORT || 5000;

        app.use(bodyParser.json());

        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(cors())

        app.use('/api/todos',todoRoutes)
        app.use('/api/users',userRoutes)


        app.listen(port, () => console.log(`Listening on port ${port}`));
    }
});