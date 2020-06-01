import React, { Component, createContext } from "react";
import Axios from "axios";
import qs from "querystring";
export const FolderContext = createContext();

class FolderContextProvider extends Component {
  state = {
    currentEdit: null,
    selectedFolder: null,
    folders: null,
    newFolder: "",
  };

  onChangeNewFolder = (e) => {
    // update newFolder state variable in order to create new folders
      this.setState({
          newFolder:e.target.value
      })
  }

  setSelectedFolder = (folder) => {
    // Set selected folder for use in render
      this.setState({
          selectedFolder:folder
      })
  }

  deleteFolder =(token,folderID)=>{
    // Delete Folder
    Axios({
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `http://localhost:5000/api/folders/${folderID}`,
    }).then((response) => {
        var data = this.state.folders.filter(folder=>folder._id!==response.data._id)

        this.setState({
            folders: data,
            newFolder:""
        })
    });
  }

  addNewFolder = (token) => {
    // Add New FOlder item and clear content of new folder in form
    Axios({
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: qs.stringify({ name: this.state.newFolder }),
      url: "http://localhost:5000/api/folders/",
    }).then((response) => {
      var clone = this.state.folders.slice(0);
      clone.push(response.data);
      this.setState({
        folders: clone,
        newFolder:""
      });
    });
  };
  
  fetchFolderList = async (token) => {
    // Get all folders and todos that belong to the user
    Axios({
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: "http://localhost:5000/api/folders/",
    }).then((response) => {
      this.setState({
        folders: response.data,
      });
    });
  };

  render() {
    return (
      <FolderContext.Provider
        value={{
          ...this.state,
          fetchFolderList: this.fetchFolderList,
          setSelectedFolder: this.setSelectedFolder,
          deleteFolder:this.deleteFolder,
          onChangeNewFolder:this.onChangeNewFolder,
          addNewFolder:this.addNewFolder
        }}
      >
        {this.props.children}
      </FolderContext.Provider>
    );
  }
}

export default FolderContextProvider;
