import React, { Component, createContext } from "react";
import Axios from "axios";
import qs from "querystring";
export const ToDoContext = createContext();

class ToDoContextProvider extends Component {
  state = {
    currentEdit: null,
    todos: null,
    newToDo: "",
  };

  setCurrentEdit = (todo) => {
    // Enable edit mode to display edit screen
    this.setState({ currentEdit: todo });
  };

  changeNewToDo = (e) => {
    // Update State variable of new todo item
    this.setState({
      newToDo: e.target.value,
    });
  };

  addNewToDo = (e, token,folderID) => {
    // Add New ToDo item and clear content of new todo item in form
    Axios({
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: qs.stringify({ text: this.state.newToDo, isComplete: false,folderID:folderID}),
      url: "http://localhost:5000/api/todos/",
    }).then((response) => {
      var clone = this.state.todos;
      clone.push(response.data);
      this.setState({
        todos: clone,
        newToDo: "",
      });
    });
  };

  toggleCheckmark = (value,todo,token)=>{
    // Save Checkmark on Toggle
    Axios({
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: qs.stringify({ text: todo.text, isComplete: value }),
        url: `http://localhost:5000/api/todos/${todo._id}`,
      }).then((response) => {
        todo.isComplete = true
        var filteredArray = this.state.todos.filter(toRemove=> toRemove!==todo)
        filteredArray.push({_id:todo._id,text:todo.text,isComplete:value})
        this.setState({})
      })
      .catch(err=>{
          console.log(err)
      })
  }

  saveTodo = (text,isComplete,token,todoID)=>{
    // Save ToDo Changes
Axios({
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: qs.stringify({ text: text, isComplete: isComplete }),
      url: `http://localhost:5000/api/todos/${todoID}`,
    }).then((response) => {
      var filteredArray = this.state.todos.slice(0)
      filteredArray.forEach(todo =>{
        if (todo._id===todoID){
          todo.text = text
        }
      })
      this.setState({
          todos:filteredArray
      })
      this.setCurrentEdit(null)
    })
  }

  deleteTodo=(token,text,todoID)=>{
    // Delete ToDo
    Axios({
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `http://localhost:5000/api/todos/${todoID}`,
    }).then((response) => {
      var filteredArray = this.state.todos.filter(todo=>todo._id!==todoID)
      this.setState({todos:filteredArray})
      this.setCurrentEdit(null)
    });
  }

  selectFolder = (folder)=>{
    // Select Todo group to show
      if (folder === null){
        this.setState({
            todos:null
        })
      }
      else {
        this.setState({
            todos:folder.todos
        })
      }
  }

  render() {
    return (
      <ToDoContext.Provider
        value={{
          ...this.state,
          setCurrentEdit: this.setCurrentEdit,
          fetchToDoList: this.fetchToDoList,
          changeNewToDo: this.changeNewToDo,
          addNewToDo: this.addNewToDo,
          saveTodo: this.saveTodo,
          deleteTodo:this.deleteTodo,
          toggleCheckmark:this.toggleCheckmark,
          selectFolder: this.selectFolder
        }}
      >
        {this.props.children}
      </ToDoContext.Provider>
    );
  }
}

export default ToDoContextProvider;
