import { useEffect, useState } from "react"
import "../styles/gamePage.css"
import "../styles/pixelated.css"

export default function GamePage(props){
    const [turn, setTurn] = useState(props.initialTurn)
    const [health, setHealth] = useState(100)
    const [opponentHealth, setOppHealth] = useState(props.opp)
    const [oppData, setOppData] = useState(props.gendata)
    const [mydata, setMydata] = useState(props.mydata)

    useEffect(()=>{
        console.log(props.gendata)
        console.log(props.mydata)

        if (props.gendata != null) {
            setOppData(props.gendata)
        }

        setTurn(props.initialTurn)
        setHealth((prev) => prev-props.todecrease)
        setOppHealth(props.opp)
        setMydata(props.mydata)
    }, [props.initialTurn])

    function actionButton(value){
        props.turnFunc(value, health)
    }

    return(
        <div className="turnGame">

            {turn == true? (<div className="gamePage">
                <div className="nes-container is-dark gameChat">
                    <div className="chatloggs">
                        <p>helo</p>
                        <p>helo</p>
                        <p>helo</p>
                        <p>helo</p>
                    </div>
                    <button type="button" className="nes-btn is-primary">Primary</button>
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
                                    <progress className="nes-progress is-success" value={opponentHealth} max="100"></progress>
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
                                    {/* DYNAMICALLY CHANGE VALUE */}
                                    <progress className="nes-progress is-success" value={health} max="100"></progress>
                            </div>
                            <div className="characterCon userLeft">
                                <img src="./removed.png" className="backgroundIMG" alt="" />
                                <img className="oppIMG" src={mydata.avatar} alt="opponentIMG" />
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

            </div>): <img className="backimag" src="./bac.png"/>}

        </div>

    )
}