import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserInfo } from "./MusicContext";

export default function Musiclogin ({setlogin}){
    const[password,setpassword]=useState();
    const[email,setemail]=useState();
    const[message,setmessage]=useState("");
    const navigate=useNavigate();
    const {setuser}=UserInfo();
    useEffect(()=>{
    const Email= localStorage.getItem("email")
    const Password=localStorage.getItem("password")
    setuser(Email)
    if(Email!=null&&Password!=null){
        setlogin(true)
        navigate("/welcome")
    }
},[])
    async function userlogin(){

       const response= await axios.get(`http://localhost:8085/music/get/${email}/${password}`)
       if(response.data.includes("logged in successful")){
        setmessage("logged in successful");
        let proId=response.data.split("/");
        localStorage.setItem("proId",proId[1]);
        console.log("logged in successful");
        localStorage.setItem("email",email);
        localStorage.setItem("password",password);
        setuser(email);
        setTimeout(()=>{
        navigate("/welcome");
        },2000);
       }
       else{
        setmessage(response.data);
       }
       
    }
    return(
        <div style={{textAlign:"center"}}>
        
        <h1 style={{textAlign:"center"}}>Login</h1>
        <input style={{width:"400px" , marginBottom:"10px"}}
        type="email" placeholder="enter email"  required onChange={(e)=>setemail(e.target.value)}/><br/>
        <input style={{width:"400px" , marginBottom:"10px"}}
         type="password" placeholder="enter password" required onChange={(e)=>setpassword(e.target.value)}/><br/>
        <button style={{marginLeft:"20px"}} onClick={userlogin}>Login</button>
        <button style={{marginLeft:"20px"}} onClick={()=>navigate("/forgetpassword")}>ForgetPassword</button>
        <button style={{marginLeft:"20px"}} onClick={()=>navigate("/register")}>Register</button>

        <h6 style={{textAlign:"center"}}>{message}</h6>
        </div>
    )
}