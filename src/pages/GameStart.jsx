import { useEffect, useState } from "react";
import io from "socket.io-client";
import GamePage from "./GamePage";

export default function GameStart() {
    const [message, setMessage] = useState("");
    const [socketId, setSocketId] = useState("");
    const [socket, setSocket] = useState(null);
    const [lobby, setLobby] = useState(true)
    const [game, setGame] = useState(false)
    const [player1, setplayer1] = useState(false)

    useEffect(() => {
        const newSocket = io.connect("http://192.168.2.220:3001");
        setSocket(newSocket);

        newSocket.on("connect", () => {
            setSocketId(newSocket.id);
            localStorage.setItem("id", newSocket.id);
            console.log(`Connected with socket ID: ${newSocket.id}`);
        });

        newSocket.on("message", (data) => {
            setMessage(data);
        });

        newSocket.on("yourTurn", ()=>{
            console.log("yay my turn")
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

    function turn(value){
        setplayer1(false)
        socket.emit("doTurn", {data: value, socketId: socketId})
    }

    return (
        <div>
            {lobby && (
                <div>
                    <h1>Game Start</h1>
                    <p>Socket ID: {socketId}</p>
                    <p>Message from server: {message}</p>
                </div>
            )}
            {game && <GamePage initialTurn={player1} turnFunc={turn}/>}

        </div>
        
    );
}
