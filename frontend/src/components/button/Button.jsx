import {Fragment, useState} from "react";
import {useNavigate} from "react-router-dom";

function Button({ type = "small", label = "Button", backgroundColor = "#3F4FCC", color = "#ffffff"}) {

    const[isHovering, setIsHovering] = useState(false);

    const navigate = useNavigate();

    function handleClick() {
        if (label === "Get Started" || label === "Register") {
            navigate("/register");
        } else {
            navigate("/login");
        }
    }

    const buttonStyles = {
        gridTemplateColumns: "1fr 1fr",
        justifyItems: "center",
        alignItems: "center",
        backgroundColor: isHovering ? "#2A3F91" : backgroundColor,
        color: color,
        aspectRatio: 2,
        width: type === "large" ? "100%" : "90%",
        padding: "12px 20px",
        borderRadius: "8px",
        border: "2px solid transparent",
        fontSize: type === "large" ? "1.4rem" : "1rem",
        fontWeight: "600",
        boxShadow: isHovering ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "0 2px 6px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        cursor: "pointer",
    }

    return (
        <button onClick={handleClick} style={buttonStyles} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            {label}
        </button>
    )
}

export default Button;