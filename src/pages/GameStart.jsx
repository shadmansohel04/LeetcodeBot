import { useEffect, useState } from "react";
import io from "socket.io-client";
import GamePage from "./GamePage";

export default function GameStart() {
    const [socketId, setSocketId] = useState("");
    const [socket, setSocket] = useState(null);
    const [lobby, setLobby] = useState(true)
    const [game, setGame] = useState(false)
    const [player1, setplayer1] = useState(false)
    const [decreaser, setDecreaser] = useState(null)
    const [opp, setOpp] = useState(100)

    useEffect(() => {
        const newSocket = io.connect("http://192.168.2.220:3001");
        setSocket(newSocket);

        newSocket.on("connect", () => {
            setSocketId(newSocket.id);
            localStorage.setItem("id", newSocket.id);
            console.log(`Connected with socket ID: ${newSocket.id}`);
        });

        newSocket.on("yourTurn", (data)=>{
            console.log("yay my turn")
            console.log(data)
            setDecreaser(data.damage)
            setOpp(data.opp)
            setplayer1(true)
        })

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

            return () => {
                socket.off("sendTogame");
            };
        }
    }, [socket]);

    function turn(value, myHealth){
        setplayer1(false)
        // add leetcode value to data and then handle it on backend

        socket.emit("doTurn", {data: value, socketId: socketId, myHealth: myHealth})
    }

    return (
        <div>
            {lobby && (
                <div>
                    <h1>Game Start</h1>
                    <p>Socket ID: {socketId}</p>
                </div>
            )}

            {game && <GamePage opp={opp} initialTurn={player1} todecrease={decreaser} turnFunc={turn}/>}

        </div>
        
    );
}
