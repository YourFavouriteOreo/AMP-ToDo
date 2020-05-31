import React, { Component,createContext } from 'react';
import Login from '../components/Login'
export const AuthContext = createContext();

class AuthContextProvider extends Component {
    state = {
        token: ""
    }
    componentDidMount= ()=>{
        var retrievedToken = localStorage.getItem("token")
        if (!retrievedToken){
            console.log("token not found")
        }
        else {
            this.setState({token:retrievedToken})
        }
    }
    setToken = (newToken) => {
        localStorage.setItem("token",newToken)
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
