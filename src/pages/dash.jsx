import {useLocation, useNavigate } from "react-router-dom"
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
    const [scoreInfo, setScore] = useState({
        punch: 50,
        kick: 50,
        blast: 50,
        smash: 50
    })

    useEffect(()=>{
        
        if(state != null && state.boost == true){
            setScore((prev)=>({
                smash: prev.smash + 20,
                kick: prev.kick + 20,
                blast: prev.blast + 20,
                punch: prev.punch + 20
            }))
        }
        console.log(state.leetUser)
        
        axios.post("http://localhost:3000/gettheScores", {
            name: state.leetUser
        }).then((response)=>{

            setScore((prev) => ({
                punch: prev.punch + parseInt(response.data.data.perc),
                kick: prev.kick + parseInt(response.data.data.ranking),
                smash: prev.smash + parseInt(response.data.data.solved),
                blast: prev.blast
            }))
        })
        .catch((err)=>{
            console.log(err)
        })

        const avIMG = data[Math.floor((Math.random() * data.length))]
        setAvatar(avIMG)
        axios.post("http://localhost:3000/namebot", {
            name: state.leetUser
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
            <h1>Hello {state.leetUser}</h1>
            <div className="infoCon">
                <div className="nes-container leftDash">
                    <h4>Your Attributes</h4>
                    <h6>Punch: {scoreInfo.punch}</h6>
                    <progress className="nes-progress" value={scoreInfo.punch} max="100"></progress>
                    <h6>Kick: {scoreInfo.kick}</h6>
                    <progress className="nes-progress is-primary" value={scoreInfo.kick} max="100"></progress>
                    <h6>Blast {scoreInfo.blast}</h6>
                    <progress className="nes-progress is-success" value={scoreInfo.blast} max="100"></progress>
                    <h6>Smash {scoreInfo.smash}</h6>
                    <progress className="nes-progress is-error" value={scoreInfo.smash} max="100"></progress>
                </div>
                <div className="middleDash">
                    <h3>{roboName}</h3>
                    <img src={avatar.img} alt="" className="avatar"/>
                </div>

                
                <div className="nes-container leftDash">
                    <button type="button" onClick={()=>{window.location.href = `http://localhost:3000?name=${state.leetUser}`}} className="nes-btn is-error">LeetCode Question</button>
                    <button type="button" onClick={()=>{navigate("/lobby", {state: {allInfo, scoreInfo}})}} className="nes-btn is-success">Lobby</button>
                </div>
            </div>

        </div>
    )
}