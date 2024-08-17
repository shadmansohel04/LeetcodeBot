import { useEffect, useState } from "react";
import io from "socket.io-client";


export default function GameStart() {

    const [message, setMessage] = useState("");
    const [socketId, setSocketId] = useState("");

    useEffect(() => {
        const socket = io.connect("http://192.168.2.220:3001");

        socket.on("connect", () => {
            setSocketId(socket.id);
            localStorage.setItem("id", socket.id)
            console.log(`Connected with socket ID: ${socket.id}`);
        });


        socket.on("message", (data) => {
            setMessage(data);
        });

        // Cleanup on component unmount
        return () => {
            socket.off("message");
            socket.off("connect");
        };
    }, []);

    return (
        <div>
            <h1>Game Start</h1>
            <p>Socket ID: {socketId}</p>
            <p>Message from server: {message}</p>
        </div>
    );
}
