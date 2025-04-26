import styles from "./Dashboard.module.css";
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import MeetInfo from "../../components/meetInfo/MeetInfo.jsx";
import MeetCard from "../../components/MeetCard/MeetCard.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


function Dashboard() {
    const navigate = useNavigate();
    const [showInfo, setShowInfo] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [meetings, setMeetings] = useState([]);


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/getAllSchedules?email=${localStorage.getItem("email")}`);
                const data = await response.json();
                setMeetings(data.allSchedules);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        getData();
    }, []);

    const handleCardClick=(meetData)=>{
        setSelectedMeeting(meetData);
        setShowInfo(true);
    }

    const handleClose = () => {
        setShowInfo(false);
        setSelectedMeeting(null);
    };

    const handleDelete = async (meetingId) => {
        try{
            const response = await fetch(`http://localhost:8080/deleteSchedule?email=${localStorage.getItem("email")}&id=${meetingId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Deleted successfully:', data);
                alert('Schedule deleted successfully!');
                setMeetings(prevMeetings => prevMeetings.filter(meeting => meeting.id !== meetingId));
                handleClose();

            } else {
                alert('Delete failed: ' + data.message);
            }
        } catch(error){
            console.error('Error deleting meeting:', error);
    }
};

    return (
        <div className={styles.dashContainer}>
            <div className={styles.headerContainer}>
                <Header />
            </div>

            <div className={styles.body}>
                <h1>Teacher Dashboard</h1>

                <div className={styles.subBody}>
                    <p>Upcoming meetings: {meetings.length}</p>

                    <button onClick={() => navigate("/ScheduleMeet")}>Schedule Meeting</button>
                </div>

                <div className={styles.cardGrid} >
                    {
                        meetings &&
                        meetings.map((meeting, i) => (
                            <div key={i} onClick={() => handleCardClick(meeting)}>
                                <MeetCard
                                    title={meeting.title}
                                    dayDate={new Date(meeting.date).toLocaleDateString("en-US", {
                                        weekday: 'long',
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                    startTime={new Date(meeting.startTime).toLocaleTimeString("en-US", {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true
                                    })}
                                    endTime={new Date(meeting.endTime).toLocaleTimeString("en-US", {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true
                                    })}
                                    email={meeting.email}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>

            {showInfo && (
                <div className={styles.modalOverlay} onClick={handleClose}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <MeetInfo

                            data={selectedMeeting}
                            onClose={handleClose}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            )}

            <div className={styles.footerContainer}>
                <Footer />
            </div>
        </div>
    );
}

export default Dashboard;
