import styles from "./Register.module.css"
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import Context from "../../Context.jsx";
import Loading from "../loading/Loading.jsx";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {
        isLoading,
        setIsLoading,
    } = useContext(Context);

    const navigate = useNavigate();


    async function handleSubmit() {
        try {
            setIsLoading(true);
            const response = await fetch('https://connect-ed-backend-u0ec.onrender.com/auth/register', {
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
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
            }
        }
        catch (error) {
            alert(error.message);
        }
        finally {
            setIsLoading(false);
            navigate("/");
        }

    }

    return (
        <>
            {isLoading && <Loading />}
            <div className={styles.container}>
                <h1>
                    Create your account
                </h1>
                <p onClick={() => navigate("/login")}>
                    Or sign in to your existing account
                </p>

                <form className={styles.form}
                      onSubmit={(e) => {
                          e.preventDefault();
                          handleSubmit();
                      }}>
                    <h1>
                        Create a new account
                    </h1>
                    <div className={styles.input}>
                        <p>Full name</p>
                        <input type="text" placeholder={"Enter your full name"} required  onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className={styles.input} >
                        <p>Email address</p>
                        <input type="email" placeholder={"Enter your email address"} required  onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.input} >
                        <p>Password</p>
                        <input type="password" placeholder={"Create a password"} required  onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className={styles.input} >
                        <p>Confirm password</p>
                        <input type="password" placeholder={"Confirm your password"} required  onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <button type="submit" disabled={password !== confirmPassword || !name || !email || !password || !confirmPassword} >Create account</button>
                    <div className={styles.question}>
                        <div className={styles.dash} />
                        <p>Already have an account?</p>
                        <div className={styles.dash}/>
                    </div>
                    <h3 onClick={() => navigate('/login')}>Sign in</h3>
                </form>
            </div>
        </>
    )
}
export default Register;