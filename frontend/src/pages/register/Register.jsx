import styles from "./Register.module.css"
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const navigate = useNavigate();

    async function handleSubmit() {
        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    schedule: []
                }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                }
            })
                .finally(() => navigate("/"))
        }
        catch (error) {
            console.log(error.message);
        }

    }

    return (
        <div className={styles.container}>
            <h1>
                Create your account
            </h1>
            <p onClick={() => navigate("/login")}>
                Or sign in to your existing account
            </p>

            <div className={styles.form}>
                <h1>
                    Create a new account
                </h1>
                <div className={styles.input}>
                    <p>Full name</p>
                    <input type="text" placeholder={"Enter your full name"} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className={styles.input} >
                    <p>Email address</p>
                    <input type="text" placeholder={"Enter your email address"} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles.input} >
                    <p>Password</p>
                    <input type="text" placeholder={"Create a password"} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className={styles.input} >
                    <p>Confirm password</p>
                    <input type="text" placeholder={"Confirm your password"} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button disabled={password !== confirmPassword || !name || !email || !password || !confirmPassword} onClick={handleSubmit}>Create account</button>
                <div className={styles.question}>
                    <div className={styles.dash} />
                    <p>Already have an account?</p>
                    <div className={styles.dash}/>
                </div>
                <h3 onClick={() => navigate('/login')}>Sign in</h3>
            </div>
        </div>
    )
}
export default Register;