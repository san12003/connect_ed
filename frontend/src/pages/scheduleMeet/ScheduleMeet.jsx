import styles from "./ScheduleMeet.module.css"
import Calendar from "../../components/calendar/Calendar.jsx";
import Header from "../../components/header/Header.jsx";
import Meetings from "../../data/Meetings.js";
import Footer from "../../components/footer/Footer.jsx";

function ScheduleMeet() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
                <Header />
            </div>
            <div className={styles.body}>
                <h1>Schedule Meetings</h1>

                <div className={styles.subBody}>
                    <p>Click on a date to schedule a new meeting or click on an existing meeting to view details.</p>
                </div>
                    <Calendar/>
                <div className={styles.footerContainer}>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
export default ScheduleMeet