import { useLocation, useNavigate } from "react-router-dom"
import "../styles/userdash.css"
import data from "../assets/data"
import { useEffect, useState } from "react"
import axios from "axios"

export default function UserDash(){
    const navigate = useNavigate()
    const location = useLocation()
    const {state} = location
    const [roboName, setRoboName] = useState("Creating Custom Bot Name...")
    const [avatar, setAvatar] = useState("")
    const [allInfo, setAllInfo] = useState({})

    useEffect(()=>{
        const avIMG = data[Math.floor((Math.random() * data.length))]
        setAvatar(avIMG)
        axios.post("http://192.168.2.220:3001/namebot", {
            name: state
        })
        .then((response)=>{
            if(response.data.success == true){
                setRoboName(response.data.name)
                setAllInfo({
                    name: response.data.name,
                    avatar: avIMG.img,
                    leetinfo: 0
                })
            }
        })
        .catch(console.log("error"))        
        
    }, [])
    
    return(
        <div className="userDash">
            <h1>Hello {state}</h1>
            <div className="infoCon">
                <div className="nes-container leftDash">
                    <h4>Your Attributes</h4>
                    <h6>Punch</h6>
                    <progress className="nes-progress" value={50} max="100"></progress>
                    <h6>Kick</h6>
                    <progress className="nes-progress is-primary" value={50} max="100"></progress>
                    <h6>Blast</h6>
                    <progress className="nes-progress is-success" value={50} max="100"></progress>
                    <h6>Smash</h6>
                    <progress className="nes-progress is-error" value={50} max="100"></progress>
                </div>
                <div className="middleDash">
                    <h3>{roboName}</h3>
                    <img src={avatar.img} alt="" className="avatar"/>
                </div>

                
                <div className="nes-container leftDash">
                    <button type="button" onClick={()=>{navigate("/leetcodeQ")}} className="nes-btn is-error">LeetCode Question</button>
                    <button type="button" onClick={()=>{navigate("/lobby", {state: allInfo})}} className="nes-btn is-success">Lobby</button>
                </div>
            </div>

        </div>
    )
}