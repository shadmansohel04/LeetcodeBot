import { useEffect, useState } from "react"
import "../styles/gamePage.css"
import "../styles/pixelated.css"
import { useNavigate } from "react-router-dom"

export default function GamePage(props){
    const navigate = useNavigate()
    const [turn, setTurn] = useState(props.initialTurn)
    const [health, setHealth] = useState(100)
    const [opponentHealth, setOppHealth] = useState(props.opp)
    const [oppData, setOppData] = useState(props.gendata)
    const [mydata, setMydata] = useState(props.mydata)

    useEffect(()=>{
        if(health <= 0){
            props.gameover(localStorage.getItem("id"))
            navigate("/")
            return
        }
    }, [health])

    useEffect(()=>{

        if (props.gendata != null) {
            setOppData(props.gendata)
        }

        setTurn(props.initialTurn)
        setHealth((prev) => prev-props.todecrease)
        setOppHealth(props.opp)
        setMydata(props.mydata)
    }, [props.initialTurn])

    function actionButton(value){
        const img = document.getElementsByClassName("meIMG")[0];
        if (img) {
            img.classList.add('shake');
        
            setTimeout(() => {
                img.classList.remove("shake");
                props.turnFunc(value, health)
            }, 1000); 
        }

        else{
            props.turnFunc(value, health)
        }
        
    }

    return(
        <div className="turnGame">

            {turn == true? (<div className="gamePage">
                <div className="nes-container is-dark gameChat">
                        <h4>Your Attributes</h4>
                        <h6>Punch: {props.bars.punch}</h6>
                        <progress className="nes-progress bar" value={props.bars.punch} max="100"></progress>
                        <h6>Kick: {props.bars.kick}</h6>
                        <progress className="nes-progress is-primary bar" value={props.bars.kick} max="100"></progress>
                        <h6>Blast {props.bars.blast}</h6>
                        <progress className="nes-progress is-success bar" value={props.bars.blast} max="100"></progress>
                        <h6>Smash {props.bars.smash}</h6>
                        <progress className="nes-progress is-error bar" value={props.bars.smash} max="100"></progress>
                </div>

                <div className="gameRight">
                    <div className="nes-container upperRight">
                        <div className="opponentCon oppDown">
                            <div className="stats pixel-corners">
                                <div className="topOfStats">
                                    <h3>{oppData.name}</h3>
                                    <h3>Lv {opponentHealth}</h3>
                                </div>
                                    {/* DYNAMICALLY CHANGE VALUE */}
                                    <progress className="nes-progress is-success health" value={opponentHealth} max="100"></progress>
                            </div>
                            <div className="characterCon">
                                <img src="./removed.png" className="backgroundIMG" alt="" />
                                <img className="oppIMG" src={oppData.avatar} alt="opponentIMG" />
                            </div>
                        </div>

                        <div className="opponentCon">
                            <div className="stats pixel-corners userRight">
                                <div className="topOfStats">
                                    <h3>{mydata.name}</h3>
                                    <h3>Lv {health}</h3>
                                </div>
                                    <progress className="nes-progress is-success health" value={health} max="100"></progress>
                            </div>
                            <div className="characterCon userLeft">
                                <img src="./removed.png" className="backgroundIMG" alt="" />
                                <img className="oppIMG meIMG" src={mydata.avatar} alt="opponentIMG" />
                            </div>
                        </div>
                    </div>

                    <div className="nes-container bottomRight">
                        <button onClick={(e)=>{actionButton(e.currentTarget.textContent)}} type="button" className="nes-btn is-success">Punch</button>
                        <button onClick={(e)=>{actionButton(e.currentTarget.textContent)}} type="button" className="nes-btn is-warning">Kick</button>
                        <button onClick={(e)=>{actionButton(e.currentTarget.textContent)}} type="button" className="nes-btn is-error">Blast</button>
                        <button onClick={(e)=>{actionButton(e.currentTarget.textContent)}} type="button" className="nes-btn is-primary">Smash</button>
                    </div>
                </div>

            </div>): <div> <img className="backimag" src="./bac.png"/> <h1 className="absolute">Waiting for your turn...</h1> </div>}

        </div>

    )
}