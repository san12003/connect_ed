import styles from "./HomePage.module.css"
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.logo}>Connect-Ed</h1>
                <h3 className={styles.login_btn} onClick={() => navigate("/login")}>Login</h3>
                <Button type={"small"} label={"Register"} />
            </div>

            <div className={styles.body}>
                <div className={styles.body_container}>
                    <h1 className={styles.heading}>
                        Connect with parents through virtual meetings
                    </h1>
                    <h4 className={styles.description}>
                        A simple way for teachers to schedule and conduct virtual meetings with parents. No complicated setup, just seamless communication.
                    </h4>
                    <div className={styles.btn_container}>
                        <Button type={"large"} label={"Get Started"} backgroundColor={"#e2fdff"} color={"#3F4FCC"} />
                        <Button type={"large"} label={"Sign In"} />
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <p>2025 Connect-Ed. All rights reserved.</p>
                <p className={styles.tos_btn}>Terms of Service</p>
                <p className={styles.pp_btn}>Privacy Policy</p>
                <p className={styles.help_btn}>Help</p>
            </div>
        </div>
    )
}
export default HomePage