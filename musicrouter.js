import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom'
import Musiclogin from './Musiclogin'
import Musicregister from './MusicRegister'
import Musicwelcome from './MusicWelcome'
import MusicForgetPassword from './MusicForgetPassword'
import { Profile } from './MusicProfile'
import { ProfileEdit } from './MusicProfileEdit'
import { useEffect, useState } from 'react'
import { UserProvider } from './MusicContext'
import MusicFavorites from './MusicFavorites'

export default function MusicRouter(){
const[login,setlogin]=useState(false)
useEffect(()=>{
const Email=localStorage.getItem('email')
const Password=localStorage.getItem('password')
if(Password!=null&&Email!=null){
    setlogin(true)
}
},[])
function handledelete(){
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    localStorage.removeItem('proId')
    setlogin(false)
    }
return(
<>
<UserProvider>
<BrowserRouter>
<Routes>
    <Route path="/" element={login?<Navigate to="/welcome"/>:<Navigate to="/login"/>}/>
    <Route path="/login" element={<Musiclogin setlogin={setlogin}/>}/>
    <Route path="/register" element={<Musicregister />}/>
    <Route path="/forgetpassword" element={<MusicForgetPassword/>}/>
    <Route path="/welcome" element={<Musicwelcome handledelete={handledelete}/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/profileedit" element={<ProfileEdit/>}/>
    <Route path="/favorites" element={<MusicFavorites/>}/>
</Routes>
</BrowserRouter>
</UserProvider>
</>
)
}
