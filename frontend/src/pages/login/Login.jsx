import styles from "./Login.module.css"
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import Context from "../../Context.jsx";
import Loading from "../loading/Loading.jsx";

function Login({ email, setEmail }) {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const {
        setToken,
        isLoading,
        setIsLoading,
    } = useContext(Context);

    async function handleSubmit() {
        try {
            setIsLoading(true);
            const response = await fetch ('https://connect-ed-backend-u0ec.onrender.com/auth/login', {
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
            const authStatus = await fetch('https://connect-ed-backend-u0ec.onrender.com/auth/protected', {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${data.token}`,
                }
            }) .finally(() => setIsLoading(false));

            if (authStatus.status === 200) {
                navigate('/Dashboard');
            } else {
                console.log('error occured');
                alert(data.error);
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            {isLoading && <Loading />}
            <div className={styles.container}>
                <h1 className={styles.heading}>
                    Sign in to Connect-Ed
                </h1>
                <p className={styles.create_account_link} onClick={() => navigate("/register")}>
                    Or create a new account
                </p>
                <form className={styles.form}
                      onSubmit={(e) => {
                          e.preventDefault();
                          handleSubmit();
                      }}>
                    <h2>
                        Sign in to your account
                    </h2>
                    <div className={styles.input}>
                        <p>Email address</p>
                        <input type="email" placeholder={"Enter your email"} onChange={(e) => {setEmail(e.target.value); localStorage.setItem("email", e.target.value)}} />
                    </div>
                    <div className={styles.input}>
                        <p>Password</p>
                        <input type="password" placeholder={"Enter your password"} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" disabled={!email || !password}>
                        Sign in
                    </button>
                    <div className={styles.question}>
                        <div className={styles.dash} />
                        <p>Don't have an account?</p>
                        <div className={styles.dash}/>
                    </div>
                    <h3 onClick={() => navigate("/register")}>Sign up</h3>
                </form>
            </div>
        </>
    )
}
export default Login;