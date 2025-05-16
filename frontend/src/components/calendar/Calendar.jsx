import styles from './Calendar.module.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {useContext, useEffect, useState} from "react";
import ModalInfo from "../modalInfo/ModalInfo.jsx";
import Context from "../../Context.jsx";
import {useNavigate} from "react-router-dom";
import Loading from "../../pages/loading/Loading.jsx";

function Calendar() {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const {date,setDate} = useContext(Context);
    const {
        token,
        isLoading,
        setIsLoading,
    } = useContext(Context)

    const handleDateClick = (info) => {
        setDate(info.dateStr);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`https://connect-ed-7pog.onrender.com/fullCalendar?email=${localStorage.getItem("email")}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }).finally(() => setIsLoading(false));
                if (response.status === 401 || response.status === 403) {
                    alert('Authentication failed! Redirecting to homepage.');
                    navigate('/'); // redirect to homepage
                    return;
                }
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
    }, [showModal]);

    const renderEventContent = (arg) => {
        const start = new Date(arg.event.start);
        const end = new Date(arg.event.end);

        const formatTime = (date) => {
            return date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        };

        return (
            <div style={{ fontSize: '0.85rem', padding: '2px', color: '#fff', backgroundColor: '#4a90e2', borderRadius: '4px' }}>
                <b>{`${formatTime(start)} - ${formatTime(end)}`}</b>
                <div>{arg.event.title}</div>
            </div>
        );
    };

    return (
        <>
            {isLoading && <Loading />}
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
                eventContent={renderEventContent}
            />

            {showModal && (
                <div className={styles.modalOverlayStyle} onClick={handleClose}>
                    <div className={styles.modalContentStyle} onClick={(e) => e.stopPropagation()}>
                        <ModalInfo onClose={handleClose} date={date} events={events} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Calendar;