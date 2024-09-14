import { useState } from "react";
import "../styles/homePage.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    const {state} = useLocation()
    const [leetUser, setLeetUser] = useState("");


    function dash() {
        let val
        if(state != null){
            val = {
                leetUser,
                boost: true
            }
        }
        else{
            val = {
                leetUser,
                boost: false
            }
        }
        navigate("/dash", { state: val});
    }

    function enterKey(e){
        if(e.key == "Enter"){
            dash()
        }
    }

    return (
        <div className="HomePage">
            <h1>Welcome</h1>
            <div style={{flexDirection: "column"}} className="nes-field is-inline darkBack mobileHome">
                <label style={{marginBottom: "5%"}} htmlFor="dark_field">Input Leetcode Username (if you have one)</label>
                <input style={{width: "100%"}}
                    type="text"
                    className="nes-input is-dark"
                    placeholder="Name"
                    value={leetUser}
                    onChange={(e) => setLeetUser(e.target.value)}
                    onKeyDown={(e)=>{enterKey(e)}}
                />
            </div>

            <button type="button" onClick={dash} className="nes-btn is-primary">
                Submit
            </button>
        </div>
    );
}
