import { useEffect, useState } from "react";
import io from "socket.io-client";
import GamePage from "./GamePage";

export default function GameStart() {
    const [message, setMessage] = useState("");
    const [socketId, setSocketId] = useState("");
    const [socket, setSocket] = useState(null);
    const [lobby, setLobby] = useState(true)
    const [game, setGame] = useState(false)

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

            return () => {
                socket.off("sendTogame");
            };
        }
    }, [socket]);

    return (
        <div>
            {lobby && (
                <div>
                    <h1>Game Start</h1>
                    <p>Socket ID: {socketId}</p>
                    <p>Message from server: {message}</p>
                </div>
            )}
            {game && <GamePage />}

        </div>
        
    );
}
