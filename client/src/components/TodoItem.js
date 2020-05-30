import React from 'react';

const ToDoItem = ({text,isComplete,editFunction}) =>{
    return (
        <div className="flex flex-row text-center font-bold">
        <div className="w-2/12 mr-2 leading-tight text-right">
        <input  type="checkbox" defaultChecked={isComplete} />
        </div>
        <div className="w-8/12 text-base">
    <span >{text}</span>
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