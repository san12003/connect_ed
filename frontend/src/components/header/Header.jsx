import styles from './Header.module.css';
import {useLocation, useNavigate} from "react-router-dom";
import React from "react";

function Header() {
    const navigate= useNavigate();
    const location = useLocation();

    function handleLogout() {
        localStorage.removeItem("email");
        navigate("/")
    }

    const currentPath = location.pathname;
    return (
        <header className={styles.header}>
            <div className={styles.logo} onClick={()=>navigate("/Dashboard")}>📘 Connect-Ed</div>
            <nav className={styles.nav}>
                <button className={currentPath === "/Dashboard" ? styles.active : styles.link}
                        onClick={()=> navigate("/Dashboard")} >Dashboard
                </button>

                <button className={currentPath === "/ScheduleMeet" ? styles.active : styles.link}
                                 onClick={() => navigate("/ScheduleMeet")}>Schedule Meeting
                </button>

                <button onClick={handleLogout}> Logout </button>
            </nav>
        </header>
    );
}

export default Header;
