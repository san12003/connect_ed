import styles from './Calendar.module.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {useContext, useEffect, useState} from "react";
import ModalInfo from "../modalInfo/ModalInfo.jsx";
import Context from "../../Context.jsx";

function Calendar() {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const { email } = useContext(Context)

    const handleDateClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`http://localhost:8080/fullCalendar?email=${localStorage.getItem("email")}`);

                if (!response.ok) {
                    const text = await response.text();
                    console.log(`Server error: ${response.status}\n${text}`);
                    return;
                }

                const data = await response.json();

                const formatted = data.allSchedules.map((e) => ({
                    id: e.id,
                    title: e.title,
                    start: e.startTime,
                    end: e.endTime,
                    extendedProps: {
                        email: e.email,
                        date: e.date
                    }
                }));

                setEvents(formatted);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [email]);

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={handleDateClick}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                height="auto"
                dayMaxEventRows={3}
            />

            {showModal && (
                <div className={styles.modalOverlayStyle} onClick={handleClose}>
                    <div className={styles.modalContentStyle} onClick={(e) => e.stopPropagation()}>
                        <ModalInfo onClose={handleClose} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Calendar;