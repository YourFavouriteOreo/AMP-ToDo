import React, { useContext } from 'react';
import { ToDoContext } from '../contexts/ToDoContext';
import { AuthContext } from '../contexts/AuthContext';



const ToDoItem = ({todo,editFunction}) =>{
    const {token} = useContext(AuthContext)
    const {toggleCheckmark} = useContext(ToDoContext)
    return (
        <div className="flex flex-row text-center font-bold">
        <div className="w-2/12 mr-2 leading-tight text-right">
        <input  type="checkbox" onClick={(evt)=>{toggleCheckmark(evt.target.checked,todo,token)}} value={todo.isComplete} defaultChecked={todo.isComplete} />
        </div>
        <div className="w-8/12 text-base">
    <span >{todo.text}</span>
        </div>
        <div className="w-2/12 ml-5">
        <button 
        onClick={editFunction}
        className="text-left text-blue-400 cursor-pointer">
            Edit</button>
        </div>
        </div>
    );
}
 
export default ToDoItem;