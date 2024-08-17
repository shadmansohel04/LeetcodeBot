import { useEffect, useState } from "react"
import "../styles/gamePage.css"
import "../styles/pixelated.css"

export default function GamePage(props){
    const [turn, setTurn] = useState(props.initialTurn)

    useEffect(()=>{
        setTurn(props.initialTurn)
    }, [props.initialTurn])

    function actionButton(value){
        props.turnFunc(value)
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
                                    <h3>Isaac</h3>
                                    <h3>Lv 100</h3>
                                </div>
                                    {/* DYNAMICALLY CHANGE VALUE */}
                                    <progress className="nes-progress is-success" value="100" max="100"></progress>
                            </div>
                            <div className="characterCon">
                                <img src="./removed.png" className="backgroundIMG" alt="" />
                                <img className="oppIMG" src="https://i.pinimg.com/originals/f4/bf/e5/f4bfe51902fe8230dffaa7e6df778476.png" alt="opponentIMG" />
                            </div>
                        </div>

                        <div className="opponentCon">
                            <div className="stats pixel-corners userRight">
                                <div className="topOfStats">
                                    <h3>Isaac</h3>
                                    <h3>Lv 100</h3>
                                </div>
                                    {/* DYNAMICALLY CHANGE VALUE */}
                                    <progress className="nes-progress is-success" value="100" max="100"></progress>
                            </div>
                            <div className="characterCon userLeft">
                                <img src="./removed.png" className="backgroundIMG" alt="" />
                                <img className="oppIMG" src="https://wallpapers.com/images/hd/bulbasaur-pokemon-png-44-qaedgoezgy9mij34.jpg" alt="opponentIMG" />
                            </div>
                        </div>
                    </div>

                    <div className="nes-container bottomRight">
                        <button onClick={(e)=>{actionButton(e.currentTarget.textContent)}} type="button" className="nes-btn is-success">Move1</button>
                        <button onClick={(e)=>{actionButton(e.currentTarget.textContent)}} type="button" className="nes-btn is-warning">Move2</button>
                        <button onClick={(e)=>{actionButton(e.currentTarget.textContent)}} type="button" className="nes-btn is-error">Move3</button>
                        <button onClick={(e)=>{actionButton(e.currentTarget.textContent)}} type="button" className="nes-btn is-primary">Primary</button>
                    </div>
                </div>

            </div>): <h1>WAIT</h1>}

        </div>

    )
}