import React, { useContext } from 'react';
import { ToDoContext } from '../contexts/ToDoContext';
import { AuthContext } from '../contexts/AuthContext';
import { FolderContext } from '../contexts/FolderContext';



const FolderItem = ({folder}) =>{
    const {token} = useContext(AuthContext)
    const {setSelectedFolder,deleteFolder} = useContext(FolderContext)
    const {selectFolder} = useContext(ToDoContext)
    return (
        <div className="flex flex-row text-center font-bold my-3 ">
        <div className="w-2 mr-2 leading-tight text-left">
        <span>-</span>
        </div>
        <div className="w-6/12 text-base ">
    <span >{folder.name}</span>
        </div>
        <div className="w-2/12 ml-5">
        <button 
        onClick={()=>{
            selectFolder(folder)
            setSelectedFolder(folder)
        }}
        className="text-left text-blue-400 cursor-pointer">
            View Items
            </button>
        </div>
        <div className="w-2/12 ml-5">
        <button 
        onClick={
            ()=>{
                deleteFolder(token,folder._id)
            }
        }
        className="text-left text-blue-400 cursor-pointer">
            Remove
            </button>
        </div>
        </div>
    );
}
 
export default FolderItem;