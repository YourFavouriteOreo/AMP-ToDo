const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Todo = require("../models/todo");

const checkAuth = require('../middleware/check-auth')


router.get("/",checkAuth,(req, res, next) => {
  Todo.find({
      owner:req.userData.id
  }).then((result) => {
    return res.status(200).json(result);
  });
});

router.post("/",checkAuth, (req, res, next) => {
  console.log(req.body);
  if (req.body.text && req.body.isComplete) {
    const newTodo = new Todo({
      _id: new mongoose.Types.ObjectId(),
      text: req.body.text,
      isComplete: req.body.isComplete,
      owner: req.userData.id
    });
    newTodo.save();
    return res.status(200).json();
  } else {
    return res.status(500).json({ error: "Please provide todo text" });
  }
});

router.patch("/:todoID",checkAuth, (req, res, next) => {
  const id = req.params.todoID;
  if (req.body.text && req.body.isComplete) {
    Todo.findOne({ _id: id }).then((result) => {
      if (result) {
        if (result.owner == req.userData.id){
            result.update(
                {text:req.body.text,isComplete:req.body.isComplete}
            ).then(newResult =>{
                return res.status(200).json(newResult)
            })
        }
        else {
            return res.status(400).json({
                error: "You are not authorized to edit this todo",
              });
        }
      } else {
        return res.status(500).json({
          error: "Todo does not exist",
        });
      }
    });
  }
});

router.delete("/:todoID",checkAuth, (req, res, next) => {
  const id = req.params.todoID;
  Todo.findOne({ _id: id }).then((result) => {
    if (result) {
        if (result.owner == req.userData.id){
            result.remove();
      return res.status(200).json(result);
        }
        else {
            return res.status(400).json({
                error: "You are not authorized to edit this todo",
              });
        }
      
    } else {
      return res.status(500).json({
        error: "Todo does not exist",
      });
    }
  });
});

module.exports = router;
