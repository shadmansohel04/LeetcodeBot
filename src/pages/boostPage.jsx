import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function(){
    const nav = useNavigate()

    useEffect(()=>{
        nav("/", {state: true})
    })
    return(
        <h1>Getting boost</h1>
    )
}