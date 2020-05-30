import React, { Component } from "react";
import ToDoItem from "./TodoItem";
import Axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import qs from "querystring"
import EditTodo from "./EditTodo";

class ToDoList extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      currentEdit: null,
      todos: [],
      isLoading: true,
      newToDo: "",
    };
  }

  setCurrentEdit = (todo) => {
    this.setState({currentEdit:todo})
  }

  exitEditMode = (newTodo) =>{
    var newTodos = this.state.todos.filter(oldTodo=> oldTodo!== this.state.currentEdit)
    console.log("done filtering")
    console.log(newTodo)
    if (newTodo !=null){
      newTodos.push(newTodo)
    }
    this.setState({
      currentEdit:null,
      todos:newTodos
    })
  }

  changeNewToDo = (e) => {
    // Update State variable of new todo item
    this.setState({
      newToDo: e.target.value,
    });
  };

  componentDidMount() {
    console.log(this.context.token);
    Axios({
      method: "get",
      headers: {
        Authorization: `Bearer ${this.context.token}`,
      },
      url: "http://localhost:5000/api/todos/",
    }).then((response) => {
      this.setState({
        todos: response.data,
        isLoading: false,
      });
    });
  }

  addNewToDo = (e) => {
    // Add New ToDo item and clear content of new todo item in form
    e.preventDefault();
    Axios({
      method: "post",
      headers: {
        Authorization: `Bearer ${this.context.token}`,
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

  render() {
    if (!this.state.isLoading) {
      if (this.state.currentEdit != null){
        return <EditTodo todo={this.state.currentEdit} exitFunction={this.exitEditMode}/>
      }
      else {
        return (
          <div className="max-w-lg my-auto w-6/12 mx-auto">
            <div className="my-5">
              <h1 className="text-2xl font-bold leading-tight mb-5">
                To-do List
              </h1>
              <div className="flex flex-col">
                {this.state.todos.map((todo) => {
                  return (
                    <ToDoItem
                      key={todo._id}
                      text={todo.text}
                      isComplete={todo.isComplete}
                      editFunction = {()=>{
                        this.setCurrentEdit(todo)
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <form className="flex flex-row justify-center">
              <input
                className="appearance-none block w-9/12 mr-5 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="New ToDo"
                onChange={this.changeNewToDo}
                value={this.state.newToDo}
              />
              <button
                className="shadow bg-purple-500 hover:bg-purple-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded transition-all duration-200"
                onClick={this.addNewToDo}
                type="submit"
              >
                Add
              </button>
            </form>
          </div>
        );
      }
    } else {
      return <div></div>;
    }
  }
}

export default ToDoList;
