import styles from "./Login.module.css"
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Login({ email, setEmail }) {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    async function handleSubmit() {
        try {
            const response = await fetch ('http://localhost:8080/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                }
            })
            const data = await response.json();
            setToken(data.token);
            const authStatus = await fetch('http://localhost:8080/auth/protected', {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${data.token}`,
                }
            })

            if (authStatus.status === 200) {
                navigate('/dashboard');
            } else {
                console.log('error occured');
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>
                Sign in to Connect-Ed
            </h1>
            <p className={styles.create_account_link} onClick={() => navigate("/register")}>
                Or create a new account
            </p>
            <div className={styles.form}>
                <h2>
                    Sign in to your account
                </h2>
                <div className={styles.input}>
                    <p>Email address</p>
                    <input type="text" placeholder={"Enter your email"} onChange={(e) => {setEmail(e.target.value); localStorage.setItem("email", e.target.value)}} />
                </div>
                <div className={styles.input}>
                    <p>Password</p>
                    <input type="password" placeholder={"Enter your password"} onChange={e => setPassword(e.target.value)}/>
                </div>
                <button disabled={!email || !password} onClick={handleSubmit}>
                    Sign in
                </button>
                <div className={styles.question}>
                    <div className={styles.dash} />
                    <p>Don't have an account?</p>
                    <div className={styles.dash}/>
                </div>
                <h3 onClick={() => navigate("/register")}>Sign up</h3>
            </div>
        </div>
    )
}
export default Login;