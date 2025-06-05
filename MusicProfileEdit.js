import { useState } from "react";
import { useNavigate} from "react-router-dom"

function ProfileEdit(){
    const navigate=useNavigate();
    const userID=localStorage.getItem("proId");
    const [formData,setFormData]=useState({
        name:"",
        age:"",
        gender:"",
        phone:"",
        email:""
    });

    const handlechange=(e)=>{
        const{name,value}=e.target;
        setFormData((prev)=>
        ({
            ...prev,[name]:value
        }
        ))
        console.log(formData)
    }

    const handlesubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch(`http://localhost:8085/music/profilepost?Login_id=${userID}`,{
            method:"PUT",
            body:JSON.stringify(formData),
            headers:{"Content-Type":"application/json;charset=UTF-8"}

        }
        );
        const result=await response.text();
        alert(result);
    }

    return(
        <>
        <div style={{width:"50%",height:"50%",paddingLeft:"10%",marginLeft:"25%",marginTop:"10%"}}>
        <button style={{position:"fixed",right:"5%",top:"5%",backgroundColor:"red"}} onClick={()=>navigate("/welcome")}>Back</button>
        <form onSubmit={handlesubmit}>
        <input type="text" name="name" placeholder="Enter your name"  onChange={(e)=>handlechange(e)} style={{width:"60%",margin:"10px",height:"25px"}}/><br/>
        <input type="number" name="age" max={99} min={10} onChange={(e)=>handlechange(e)} placeholder="Enter your age" style={{width:"60%",margin:"10px",height:"25px"}}/><br/>
        <input id="MALE" type="radio" name="gender" value={"MALE"} onChange={(e)=>handlechange(e)} style={{width:"10%",margin:"10px",marginLeft:"0px",height:"25px"}}/><label htmlFor="MALE">MALE</label> 
        <input id="FEMALE" type="radio" name="gender" value={"FEMALE"} onChange={(e)=>handlechange(e)} style={{width:"10%",margin:"10px",height:"25px"}}/><label htmlFor="FEMALE">FEMALE</label><br/>
        <input type="tel" name="phone" placeholder="Enter your phone no" onChange={(e)=>handlechange(e)} style={{width:"60%",margin:"10px",height:"25px"}} /><br/>
        <input type="email" name="email" placeholder="Enter your Email" onChange={(e)=>handlechange(e)} style={{width:"60%",margin:"10px",height:"25px"}}/><br/>
        <button type="submit" style={{position:"fixed",right:"10%",top:"5%",backgroundColor:"blue"}}>update</button>
        </form>
        </div>
        </>
    )
}

export {ProfileEdit}