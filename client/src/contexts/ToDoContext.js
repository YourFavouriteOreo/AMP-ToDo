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
    this.setState({ currentEdit: todo });
  };

  changeNewToDo = (e) => {
    // Update State variable of new todo item
    this.setState({
      newToDo: e.target.value,
    });
  };

  addNewToDo = (e, token) => {
    // Add New ToDo item and clear content of new todo item in form
    Axios({
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: qs.stringify({ text: this.state.newToDo, isComplete: false }),
      url: "http://localhost:5000/api/todos/",
    }).then((response) => {
      var clone = this.state.todos.slice(0);
      clone.push({ text: this.state.newToDo, isComplete: false });
      this.setState({
        todos: clone,
        newToDo: "",
      });
    });
  };

  toggleCheckmark = (value,todo,token)=>{
      value = !value
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
  }

  saveTodo = (text,token)=>{
    // Save ToDo Changes
Axios({
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: qs.stringify({ text: text, isComplete: this.state.currentEdit.isComplete }),
      url: `http://localhost:5000/api/todos/${this.state.currentEdit._id}`,
    }).then((response) => {
      var filteredArray = this.state.todos.filter(todo=> todo!==this.state.currentEdit)
      filteredArray.push({_id:this.state.currentEdit._id,text:text,isComplete:this.state.currentEdit.isComplete})
      this.setState({
          todos:filteredArray
      })
      this.setCurrentEdit(null)
    })
  }

  deleteTodo(token,text) {
    // Save ToDo Changes
    Axios({
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: qs.stringify({ text: text, isComplete: this.state.currentEdit.isComplete }),
      url: `http://localhost:5000/api/todos/${this.state.currentEdit._id}`,
    }).then((response) => {});
  }

  fetchToDoList = async (token) => {
    Axios({
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: "http://localhost:5000/api/todos/",
    }).then((response) => {
      this.setState({
        todos: response.data,
      });
    });
  };

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
          toggleCheckmark:this.toggleCheckmark
        }}
      >
        {this.props.children}
      </ToDoContext.Provider>
    );
  }
}

export default ToDoContextProvider;
