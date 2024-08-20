import { useEffect, useState } from "react";
import io from "socket.io-client";
import GamePage from "./GamePage.jsx";
import "../styles/lobby.css"
import { useLocation, useNavigate } from "react-router-dom";

export default function GameStart() {
    const nav = useNavigate()
    const {state} = useLocation()
    const [socketId, setSocketId] = useState("");
    const [socket, setSocket] = useState(null);
    const [lobby, setLobby] = useState(true)
    const [game, setGame] = useState(false)
    const [player1, setplayer1] = useState(false)
    const [decreaser, setDecreaser] = useState(null)
    const [opp, setOpp] = useState(100)
    const [oppdata, setoppdata] = useState(null)

    useEffect(() => {
        const newSocket = io.connect("http://localhost:3000/");
        setSocket(newSocket);

        newSocket.on("connect", () => {
            setSocketId(newSocket.id);
            localStorage.setItem("id", newSocket.id);
            console.log(`Connected with socket ID: ${newSocket.id}`);
            newSocket.emit("sendOppInfo", {info: state.allInfo, id:newSocket.id})
        });

        return () => {
            newSocket.off("message");
            newSocket.off("connect");
            newSocket.disconnect(); // Properly close the socket connection
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("sendTogame", (data) => {
                setLobby(false)
                setGame(true)
            });

            socket.on("YouAreOne", (data)=>{
                setplayer1(true)
            })

            socket.on("winner", ()=>{
                alert("YOU WIN")
                nav("/")
            })

            socket.on("loser", ()=>{
                alert("YOU LOSE")
            })

            socket.on("getOpp", (data) =>{
                setoppdata(data.data)
            })

            socket.on("yourTurn", (data)=>{
                setoppdata(data.genData)
                setDecreaser(data.damage)
                setOpp(data.opp)
                setplayer1(true)
            })

            return () => {
                socket.off("sendTogame");
            };
        }
    }, [socket]);

    function turn(value, myHealth){
        setplayer1(false)

        socket.emit("doTurn", {data: value, socketId: socketId, myHealth: myHealth, me: state.allInfo, scoreInfo: state.scoreInfo})
    }

    function gameover(loser){
        socket.emit("gameOver", {data: loser})
    }

    return (
        <div>
            {lobby && (
                <div className="lobbyCon">
                    <h1>Lobby</h1>
                    <div className="loadDot">
                        <h2>Waiting For player 2</h2>
                        <div className="loading">
                            <span className="loading__dot"></span>
                            <span className="loading__dot"></span>
                            <span className="loading__dot"></span>
                        </div>
                    </div>
                    <img src={state.allInfo.avatar} alt="" />
                </div>
            )}

            {game && <GamePage gameover={gameover} bars={state.scoreInfo} mydata={state.allInfo} gendata={oppdata} opp={opp} initialTurn={player1} todecrease={decreaser} turnFunc={turn}/>}

        </div>
        
    );
}
