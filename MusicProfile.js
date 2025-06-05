import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "./profilestyle.css"
function Profile(){
    const navigate=useNavigate();
    const [profile,setProfile]=useState(null);
    const userID=localStorage.getItem("proId");
    useEffect(()=>{
       

    const fetchProfile=async()=>{
        try{
        const response=await fetch(`http://localhost:8085/music/profileget?Login_id=${userID}`);
        const data=await response.json();
        setProfile(data);
         console.log(data)
        }
        catch(error){
            console.log("error fetching profile "+ error)
        }
    };


    const delay=setTimeout(()=>{
        fetchProfile()
    },500)

    return ()=>clearTimeout(delay)
  
},[userID])
    return(
        <>
        <div style={{width:"50%",height:"50%",paddingLeft:"10%",marginLeft:"30%",marginTop:"10%"}}>
        <button style={{position:"fixed",right:"5%",top:"5%",backgroundColor:"red"}} onClick={()=>navigate("/welcome")}>Back</button>
        <button style={{position:"fixed",right:"10%",top:"5%",backgroundColor:"blue"}} onClick={()=>navigate("/profileedit")}>Edit</button>
        <span><h1 id="protop">PROFILE</h1></span>
         {profile && <div>
        <h2>NAME :</h2> <h2 id="infoname"> {profile.name}</h2><br/>
        <h2>AGE :</h2> <h2 id="infoage"> {profile.age}</h2><br/>
        <h2>GENDER :</h2> <h2 id="infogender"> {profile.gender}</h2><br/>
        <h2>PHONE : </h2><h2 id="infophone"> {profile.phone}</h2><br/>
        <h2>EMAIL :  </h2><h2 id="infoemail"> {profile.email}</h2><br/>
        </div>}
        </div>
        </>
    )
}

export {Profile}