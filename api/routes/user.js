const express = require("express")
const router = express.Router();
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require('../models/user')

router.post('/signup', (req, res, next) => {
    console.log(req.body)
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    error: "Email exists"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(newUser => {
                                return res.status(200).json({
                                    text:"User created"
                                })
                            })
                            .catch(errorMessage => {
                                return res.status(500).json({
                                    message: errorMessage
                                })
                            })
                    }
                })
            }
        })
})

router.post('/login', (req, res, next) => {
    User.findOne({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Auth Failed'
                })
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth Failed'
                        })
                    } else {
                        if (result) {
                            const token = jwt.sign({
                                    id: user.id
                                },
                                process.env.JWT_KEY, {
                                    expiresIn: "48h"
                                }
                            )
                            console.log(user._id);
                            console.log(result)
                            return res.status(200).json({
                                message: "Auth Successful",
                                token:token,
                            })
                        }
                        else {
                            return res.status(401).json({
                                message: 'Auth Failed'
                            });
                        }
                    }
                })
            }
        })
        .catch(err => res.status(500).json({
            error: err
        }))
})

module.exports = router;