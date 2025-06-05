import { createContext, useContext, useState } from "react";
//creating a storage
const UserContext=createContext();
//creating a provider function
export const UserProvider=({children})=>{
    const[user,setuser]=useState("");

    return(
        <UserContext.Provider value={{user,setuser}}>
            {children}
        </UserContext.Provider>
    )


}
//custom comp for usecontext
export  const UserInfo=()=>(
    useContext(UserContext)
);