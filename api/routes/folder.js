const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Folder = require("../models/folder");
const Todo = require("../models/todo");
const qs = require ("querystring")

const checkAuth = require('../middleware/check-auth')


router.get("/",checkAuth,(req, res, next) => {
  Folder.find({
      owner:req.userData.id
  })    
  .populate({path:"todos"})
  .then((result) => {
    return res.status(200).json(result);
  });
});

router.post("/",checkAuth, (req, res, next) => {
    if (req.body.name) {
      const newFolder = new Folder({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        todo: [],
        owner: req.userData.id
      });
      newFolder.save().then(result=>{
          return res.status(200).json(result)
      })
    } else {
      return res.status(500).json({ error: "Please provide folder text" });
    }
  });

  router.patch("/:folderID",checkAuth, (req, res, next) => {
    const id = req.params.folderID;
    if (req.body.text && req.body.isComplete) {
      Folder.findOne({ _id: id }).then((result) => {
        if (result) {
          if (result.owner == req.userData.id){
              result.update(
                  {name:req.body.text,todos:req.body.todos}
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
            error: "Folder does not exist",
          });
        }
      });
    }
  });
  
  router.delete("/:folderID",checkAuth, (req, res, next) => {
    const id = req.params.folderID;
    Folder.findOne({ _id: id }).populate({path:"todos"}).then((result) => {
      if (result) {
          if (result.owner == req.userData.id){
              result.todos.forEach(todo => {
                  dataTodo = new Todo(todo)
                  dataTodo.remove()
              });
            result.remove()
            .then(result=>{
                res.status(200).json(result)
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
  });

module.exports = router;
// 5ed1bdc5e1c6512d48d6537b