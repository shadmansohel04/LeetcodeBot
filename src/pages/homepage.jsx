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

    return (
        <div className="HomePage">
            <h1>Welcome</h1>
            <div className="nes-field is-inline darkBack">
                <label htmlFor="dark_field">Input Leetcode Username</label>
                <input
                    type="text"
                    className="nes-input is-dark"
                    placeholder="Name"
                    value={leetUser}
                    onChange={(e) => setLeetUser(e.target.value)}
                />
            </div>

            <button type="button" onClick={dash} className="nes-btn is-primary">
                Submit
            </button>
        </div>
    );
}
