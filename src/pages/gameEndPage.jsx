import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "../styles/gameoverpage.css"

export default function GameEnd(){
    const navigate = useNavigate()
    const stateData = useLocation().state

    useEffect(()=>{
        console.log(stateData)
    },[])

    function backtolobby(){
        const val = {
            leetUser: localStorage.getItem("yourName"),
            boost: false
        }
        navigate("/dash", { state: val});
    }

    return(
        <div className="gameOverContinue">
            <h1>{stateData.data}</h1>
            <img src={stateData.avatar} alt="robot" />
            <button onClick={backtolobby} type="button" className="nes-btn is-success">Back To Lobby</button>
        </div>
    )
}