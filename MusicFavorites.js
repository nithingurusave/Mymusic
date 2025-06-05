import {useNavigate } from "react-router-dom"
import "./music.css"
import { useEffect, useRef, useState } from "react"
// import ENGLISH from "./images/ENGLISH.jpeg"
export default function Favorites(){
        const navigate = useNavigate();
        const [zoom, setZoom] = useState("none");
        const [songUrl, setSongUrl] = useState("song is not playing");
        const [albums, setAlbums] = useState([]);
        const [inputdata,setInputdata]=useState("");
        const [remFav,setRemFav]=useState();
        const audioRef=useRef("");
        
         useEffect(() => {
                const handleClick = (event) => {
                    const albumDiv = event.target.closest(".album");
                    const player = document.getElementById("playbox");
                    if (albumDiv) {
                        setZoom("block");
                        while (player.firstChild) {
                            player.removeChild(player.firstChild);
                        }
                        player.appendChild(albumDiv.cloneNode(true));
                        audioRef.current.removeAttribute("class","audio")
                        audioRef.current.setAttribute("class","playaudio")
                        player.removeAttribute("class", "album");
                        player.setAttribute("class", "albumclicked");
                        player.firstElementChild.setAttribute("class", "cloned");
                    }
                };
        
                document.addEventListener("click", handleClick);
        
                return () => {
                    document.removeEventListener("click", handleClick);
                };
            }, []);


                useEffect(() => {
                    const playbox = document.getElementById("playbox");
            
                    const handlePlayButtonClick = (event) => {
                        if (event.target.tagName === "BUTTON" && event.target.hasAttribute("data-songlink")) {
                            event.stopPropagation();
                            const songLink = event.target.getAttribute("data-songlink");
                        // console.log("Playing song:", songLink);
                        
                    setTimeout(()=>{
                    if(audioRef.current){
                        audioRef.current.src = songLink;
                       // audioRef.current.src ="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            
                        setSongUrl(songLink);
                        audioRef.current.play();
                        console.log("url:",audioRef.current.src)
                    }},1000)
                    }
                        if(event.target.tagName==="BUTTON" && event.target.textContent==="Add To Favorites"){
                            event.stopPropagation();
                            const favAlb=event.target.getAttribute("favalbum");
                            removefromfavorites(favAlb);
                        }
                    };
            
                    playbox.addEventListener("click", handlePlayButtonClick);
            
                    return () => {
                        playbox.removeEventListener("click", handlePlayButtonClick);
                    };
                },[]);
                useEffect(() => {
                    const fetchData = async () => {
                        const response=await fetch(`http://localhost:8085/music/getfavorites/${localStorage.getItem("proId")}`)
                        const result=await response.json();
                        setAlbums(result)
                    };
                    fetchData();
                }, [albums]);

                const removefromfavorites = async (removeFav) => {
                    await fetch(`http://localhost:8085/music/deletefavorites/${localStorage.getItem("proId")}/${removeFav}`, {
                        method: "DELETE"
                    })
                    .then((response) => response.text())
                    .then((data) => {
                        alert(data);
                        const timer=setTimeout(()=>{
                                back();
                        },1000);
                        
                        setAlbums(albums.filter(a => a.id !== removeFav)); // this updates the view
                        return ()=> clearTimeout(timer);
                    });
                };
                
            
                const back = () => {
                    document.getElementById("playbox").removeAttribute("class", "albumclicked");
                    document.getElementById("playbox").setAttribute("class", "albumremoved");
                    audioRef.current.removeAttribute("class","playaudio")
                    audioRef.current.setAttribute("class","audio")
                    setZoom("none");
                };

                
                function filterfun(){
                    setInputdata(document.querySelector("#searchbarr").value.toLowerCase());
                    console.log(inputdata)
                }

                let filteredalbum =albums.filter((album) =>album?.title?.toLowerCase().trim().indexOf(inputdata.trim())===0)

            

    return(
                <>
                    <h1 id="h1">Favorites </h1>
                           
                    <h6 style={{position:"fixed",top:"50px",left:"55px",width:"30%"}}><marquee>{audioRef.current&&audioRef.current.src?"playing: "+audioRef.current.src:"enjoy the tunes..."}</marquee></h6>
                    <hr />
                    <nav style={{ display: "flex" }}>
                        <h4 style={{ display: "inline-block", color: "green", fontSize: "1.5em", margin: "0px", padding: "0px", position: "fixed", left: "10%" }}>
                            <input id="searchbarr" type="search"
                                style={{
                                    width: "350px", position: "fixed", borderRadius: "10px", padding: "5px",
                                    border: "1px solid white", left: "10%", background: "transparent", color: "white",
                                    fontSize: "0.7em", display: "inline-block"
                                }}
                                placeholder="Search Movies..."
                                onKeyUp={filterfun}
                            />
                        </h4>
                    </nav>
        
                    <button id="logout" onClick={()=>navigate("/welcome")}>Main</button>
        
                    <div style={{ width: "95%", height: "75vh", position: "fixed", top: "20%", display: "flex", flexWrap: "wrap", margin: "0px 30px" }}>
                        <div id="playbox"></div>
        
                        <div style={{ height: "75vh", width: zoom === "none" ? "100%" : "60%", display: "flex", flexWrap: "wrap",justifyContent:"start",overflow: "scroll" }}>
                            <button id="zoomout"
                                style={{ position: "fixed", right: "66%", top: "24%", backgroundColor: "red", zIndex: "15", display: zoom === "none" ? "none" : "block" }}
                                onClick={back}
                            >x</button>
                          
                        
                            {filteredalbum.length>0?(filteredalbum.map((album) => {     
                                console.log(album)           
                               return  <div key={album.title} id={album.title} className="album">
                                    <img src={album.image} alt="Songs" />
                                    <audio ref={audioRef} controls>
                                        <source src={songUrl} type="audio/mpeg"></source>
                                    </audio>
                                    <h5 >{album.title}</h5>
                                    <audio
                                    ref={audioRef}
                                    controls
                                    autoPlay
                                    >
                                    <source src={songUrl} type="audio/mpeg" />
                                    </audio>
                                    {/* <marquee className="url">{audioRef.current&&audioRef.current.src}</marquee> */}
                                    <div>
                                        {album.songs && typeof album.songs === "object" ? (
                                            Object.entries(album.songs).map(([songName, songLink], index) => (
                                                <p key={index}>
                                                    <label htmlFor={index + album.title}>{songName}</label>
                                                    <button
                                                        id={index + album.title}
                                                        data-songlink={songLink}
                                                    >
                                                        &#9654;
                                                    </button>
                                                </p>
                                            ))
                                        ) : <p>No songs available</p>}
                                    </div>
                                    <button 
                                        remfav={album.id}
                                    >Remove from Favorites</button>
                                </div>
                            })):(<h2 style={{position:"fixed",left:"40%",top:"40%"}}>No Albums in favorites</h2>)
                            }
                        </div>
                    </div>
                    </>
    )
}