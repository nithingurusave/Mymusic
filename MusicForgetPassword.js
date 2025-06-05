import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function ForgetPassword(){
    const[email,setemail]=useState()
    const[message,setmessage]=useState()
    const[newpassword,setnewpassword]=useState()
    const navigate=useNavigate()
    async function updatepassword(){
        const response = await axios.post(`http://localhost:8085/music/updatepassword?email=${email}&password=${newpassword}`);
        if(response.data==="password updated successfully"){
            localStorage.removeItem("email")
            localStorage.removeItem("password")
            setmessage(response.data)
            localStorage.setItem("password",newpassword)
            localStorage.setItem("email",email)
            navigate("/login")
        }
        else{
            setmessage(response.data)
        }
       
        localStorage.setItem("password",newpassword)

    }
    return(
        <div style={{textAlign:"center"}}>
         <h1 style={{textAlign:"center"}}>Forget password</h1>
        <input style={{width:"350px",marginBottom:"10px"}}
        type="email" placeholder="enter your valid email" onChange={(e)=>setemail(e.target.value)}/><br/>
        <input style={{width:"350px",marginBottom:"10px"}}
        type="password" placeholder="enter new password" onChange={(e)=>setnewpassword(e.target.value)}/><br/>
        <button onClick={updatepassword}>Update password</button>
        <h6>{message}</h6>
        </div>
    )
}