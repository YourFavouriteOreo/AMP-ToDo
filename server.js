const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const User = require('./api/models/user')
const bcrypt = require('bcrypt')
const todoRoutes = require('./api/routes/todo');
const userRoutes = require('./api/routes/user');
const folderRoutes = require('./api/routes/folder');

mongoose.connect('mongodb://localhost:27017',(err)=> {
    if(err){
        console.log(err);
        return 0;
    }
    else {
        console.log("Connected to Mongo DB");

        User.findOne({email:'randomemail@gmail.com'})
        .then(result=>{
            if (!result){
                bcrypt.hash("test", 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: 'randomemail@gmail.com',
                            password: hash
                        });
                        user
                            .save()
                            .then(newUser => {
                                console.log("Example User Created")
                            })
                            .catch(errorMessage => {
                                console.log(errorMEssage)
                            })
                    }
                })
            }
        })
        const app = express();
        const port = process.env.PORT || 5000;

        app.use(bodyParser.json());

        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(cors())

        app.use('/api/todos',todoRoutes)
        app.use('/api/users',userRoutes)
        app.use('/api/folders',folderRoutes)


        app.listen(port, () => console.log(`Listening on port ${port}`));
    }
});