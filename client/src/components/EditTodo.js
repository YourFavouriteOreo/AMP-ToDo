import React, {useContext,useState} from 'react';
import { AuthContext } from "../contexts/AuthContext";
import { ToDoContext } from '../contexts/ToDoContext';


const EditTodo = () => {

function cancelEdit (){
    setCurrentEdit(null)
}
    const {currentEdit,setCurrentEdit,saveTodo,deleteTodo} = useContext(ToDoContext);
    const  {token} = useContext(AuthContext);
    const [text,setText] = useState(currentEdit.text)
    return (
        <div className="max-w-lg my-auto w-6/12 mx-auto flex flex-col">
            <h1 className="font-bold text-2xl mb-5">Editing Task "{currentEdit.text}"</h1>
            <input
                className="appearance-none block w-11/12 mr-5 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="New ToDo"
                onChange={(e)=>{
                    setText(e.target.value)
                }}
                value={text}
              />
              <div className="flex flex-row mt-5">
              <button
                className="shadow bg-green-500 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded transition-all duration-200"
                onClick={()=>{saveTodo(text,token)}}
                type="submit"
              >
                Save
              </button>
              <button
                className="shadow bg-gray-500 hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded transition-all duration-200 mx-5"
                onClick={cancelEdit}
                type="submit"
              >
                Cancel
              </button>
              <button
                className="shadow bg-red-500 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded transition-all duration-200"
                onClick={deleteTodo}
                type="submit"
              >
                Delete
              </button>
              </div>
          </div>
    );
}
 
export default EditTodo;