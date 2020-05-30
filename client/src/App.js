import React from "react";
import "./App.css";
import "./tailwind.generated.css";
import ToDoList from "./components/TodoList";

const App = () => (
  <div className="h-screen w-full  mx-auto flex p-6 mt-10 rounded-lg">
    <ToDoList/>
  </div>
);

export default App
