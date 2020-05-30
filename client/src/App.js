import React from "react";
import "./App.css";
import "./tailwind.generated.css";
import ToDoList from "./components/TodoList";
import AuthContextProvider from './contexts/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
    <div className="h-screen w-full  mx-auto flex p-6 mt-10 rounded-lg">
    <ToDoList/>
  </div>
  </AuthContextProvider>
  )
  
};

export default App
