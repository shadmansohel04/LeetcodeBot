import { useState } from "react";
import "../styles/homePage.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    const [leetUser, setLeetUser] = useState("");

    function dash() {
        navigate("/dash", { state: leetUser});
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
