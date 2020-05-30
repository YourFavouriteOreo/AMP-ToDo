import React, { Component } from "react";
import ToDoItem from "./TodoItem";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          text: "Try this out",
          isComplete: true,
        },
        {
          text: "Tester",
          isComplete: false,
        },
        {
          text: "testing",
          isComplete: true,
        },
      ],
      newToDo: "",
    };
  };

  changeNewToDo = (e) => {
    // Update State variable of new todo item
    this.setState({
        newToDo:e.target.value
    })
  };

  addNewToDo = (e) => {
      // Add New ToDo item and clear content of new todo item in form
      e.preventDefault();
      var clone = this.state.todos.slice(0)
      clone.push({text:this.state.newToDo,isComplete:false})
      this.setState({
          todos:clone,
          newToDo:""
      })
  }

  render() {
    return (
      <div className="max-w-lg my-auto w-6/12 mx-auto">
        <div className="my-5">
          <h1 className="text-2xl font-bold leading-tight mb-5">To-do List</h1>
          <div class="flex flex-col">
            {this.state.todos.map((todo) => {
              return <ToDoItem text={todo.text} isComplete={todo.isComplete} />;
            })}
          </div>
        </div>
        <form class="flex flex-row justify-center">
          <input
            class="appearance-none block w-9/12 mr-5 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="New ToDo"
            onChange={this.changeNewToDo}
            value={this.state.newToDo}
          />
          <button
            class="shadow bg-purple-500 hover:bg-purple-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded transition-all duration-200"
            onClick={this.addNewToDo}
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default ToDoList;
