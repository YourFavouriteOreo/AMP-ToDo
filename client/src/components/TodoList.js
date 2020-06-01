import React, {useContext} from "react";
import ToDoItem from "./TodoItem";
import FolderItem from "./FolderItem"
import { AuthContext } from "../contexts/AuthContext";
import EditTodo from "./EditTodo";
import { ToDoContext } from "../contexts/ToDoContext";
import {FolderContext} from "../contexts/FolderContext";

const ToDoList = () => {
  const { token } = useContext(AuthContext);
  const {fetchFolderList,folders,selectedFolder,onChangeNewFolder,newFolder,addNewFolder} = useContext(FolderContext)
  const {
    todos,
    currentEdit,
    newToDo,
    changeNewToDo,
    setCurrentEdit,
    addNewToDo,
    selectFolder
  } = useContext(ToDoContext);

  while(folders == null) {
    fetchFolderList(token);
    return <div></div>;
  }
  if (todos===null){
    return (
      <div className="max-w-lg my-auto w-6/12 mx-auto">
          <div className="my-5">
            <h1 className="text-2xl font-bold leading-tight mb-5">
              Folders
            </h1>
            <div className="flex flex-col">
            {folders.map((folder) => {
                return (
                  <FolderItem
                    key={folder._id}
                    folder={folder}
                  />
                );
              })}
            </div>
          </div>
          <form className="flex flex-row justify-center">
            <input
              className="appearance-none block w-9/12 mr-5 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="New Folder"
              onChange={onChangeNewFolder}
              value={newFolder}
            />
            <button
              className="shadow bg-purple-500 hover:bg-purple-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded transition-all duration-200"
              onClick={function (e){
                e.preventDefault();
                addNewFolder(token);
              }}
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
    )
  }
  else {
    if (currentEdit != null) {
      return <EditTodo/>;
    } else {
      return (
        <div className="max-w-lg my-auto w-6/12 mx-auto">
          <div className="my-5">
            <h1 className="text-2xl font-bold leading-tight mb-5">
              <span className="text-blue-500 cursor-pointer" onClick={()=>{
                selectFolder(null)
              }}>Folders</span> > {selectedFolder.name}
            </h1>
            <div className="flex flex-col">
              {todos.map((todo) => {
                return (
                  <ToDoItem
                    key={todo._id}
                    todo={todo}
                    editFunction={() => {
                      setCurrentEdit(todo);
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
              onChange={changeNewToDo}
              value={newToDo}
            />
            <button
              className="shadow bg-purple-500 hover:bg-purple-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded transition-all duration-200"
              onClick={(evt) => {
                evt.preventDefault();
                addNewToDo(evt, token,selectedFolder._id);
              }}
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
      );
    }
  }
};

export default ToDoList;
