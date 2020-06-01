import React from "react";
import "./App.css";
import "./tailwind.generated.css";
import ToDoList from "./components/TodoList";
import AuthContextProvider from "./contexts/AuthContext";
import ToDoContextProvider from "./contexts/ToDoContext";
import FolderContextProvider from "./contexts/FolderContext";

const App = () => {
  return (
    <AuthContextProvider>
      <FolderContextProvider>
        <ToDoContextProvider>
          <div className="h-screen w-full  mx-auto flex p-6 mt-10 rounded-lg">
            <ToDoList />
          </div>
        </ToDoContextProvider>
      </FolderContextProvider>
    </AuthContextProvider>
  );
};

export default App;
