import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {

    const { setToken } = useContext(AuthContext);
    const logout = () => {
        localStorage.removeItem("token")
        setToken("")
    }

    return (
        <nav className="flex items-center justify-between flex-wrap p-6">
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <button
                    className="shadow bg-purple-500 hover:bg-purple-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded transition-all duration-200"
                    type="submit"
                    onClick={logout}
                >
                    Log Out
            </button>
            </div>
        </nav>
    )
}

export default Navbar