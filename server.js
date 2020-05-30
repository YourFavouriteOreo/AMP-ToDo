const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const todoRoutes = require('./api/routes/todo');

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

        app.use('/api/todos',todoRoutes)


        app.listen(port, () => console.log(`Listening on port ${port}`));
    }
});