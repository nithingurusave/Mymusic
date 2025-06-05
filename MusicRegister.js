import  axios  from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register (){
    const[email,setemail]=useState()
    const[password,setpassword]=useState()
    const[message,setmessage]=useState()
    const navigate=useNavigate()
    async function newregister(){
        const response=await axios.post('http://localhost:8085/music/register',{
            email:email,password:password
        })
        setmessage(response.data)
        navigate("/Login")
    }
    return(
        <div style={{textAlign:"center"}}>
        <h1 style={{lineHeight:"50px",textAlign:"center"}}>Register</h1>
        <input style={{width:"350px",marginBottom:"10px"}}
         type="email" placeholder="enter email" onChange={(e)=>setemail(e.target.value)}/><br/>
        <input style={{width:"350px",marginBottom:"10px"}}
         type="password" placeholder="enterr password" onChange={(e)=>setpassword(e.target.value)}/><br/>
        <button style={{marginLeft:"30px",width:"80px"}} onClick={newregister}>Register</button>
        <h6>{message}</h6>
        </div>
    )
}