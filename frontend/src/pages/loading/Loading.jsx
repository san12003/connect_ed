import styles from './Loading.module.css'
import Lottie from "lottie-react";
import animationData from '../../assets/LoadingAnimation.json'

function Loading() {
    return (
        <div className={styles.container}>
            <Lottie className={styles.animation} animationData={animationData} loop={true} />
        </div>
    )
}

export default Loading;