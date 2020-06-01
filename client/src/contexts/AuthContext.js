import React, { Component,createContext } from 'react';
import Login from '../components/Login'
export const AuthContext = createContext();

class AuthContextProvider extends Component {
    state = {
        token: ""
    }
    componentDidMount= ()=>{
        // Retrive Auth TOken if stored
        var retrievedToken = localStorage.getItem("uniqueToDoAuthToken")
        if (!retrievedToken){
            console.log("token not found")
        }
        else {
            this.setState({token:retrievedToken})
        }
    }
    setToken = (newToken) => {
        // Set Unique Auth Token for Future Use in Local Storage
        localStorage.setItem("uniqueToDoAuthToken",newToken)
        this.setState({token: newToken})
    }
    render() { 
        if (this.state.token===""){
            return (
                <AuthContext.Provider value={{...this.state, setToken: this.setToken}}>
                    <Login/>
                </AuthContext.Provider>
            )
        }
        else {
            return (
                <AuthContext.Provider value={{...this.state, setToken: this.setToken}}>
                    {this.props.children}
                </AuthContext.Provider>
            );
        }
    }
}
 
export default AuthContextProvider;
