import React, {useContext, useState} from 'react';
import styles from './ModalInfo.module.css';
import { v4 as uuidv4 } from 'uuid';
import Context from "../../Context.jsx";
import {useNavigate} from "react-router-dom";
import Loading from "../../pages/loading/Loading.jsx";

function ModalInfo({onClose,date, events}) {
    const {
        token,
        isLoading,
        setIsLoading,
    } = useContext(Context)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: uuidv4(),
        title: "",
        date: date,
        startTime: "",
        endTime: "",
        email:"",
        link: ""
    });

    const startDateTime = new Date(`${formData.date}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.date}T${formData.endTime}`);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newStart = new Date(`${formData.date}T${formData.startTime}`);
        const newEnd = new Date(`${formData.date}T${formData.endTime}`);

        if (newEnd <= newStart) {
            alert("End time must be after start time.");
            return;
        }

        const hasOverlap = events.some(event => {
            const existingStart = new Date(event.start);
            const existingEnd = new Date(event.end);

            return (
                event.extendedProps?.date === formData.date &&
                newStart < existingEnd &&
                newEnd > existingStart
            );
        });

        if (hasOverlap) {
            alert("This time slot overlaps with an existing meeting.");
            return;
        }

        const channelName = uuidv4();
        const meetLink = `${window.location.origin}/join/${channelName}`; // generate meeting link

        try {
            setIsLoading(true);
            const response = await fetch("https://connect-ed-7pog.onrender.com/scheduleMeet", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    email: localStorage.getItem("email"),
                    schedule: {
                        id: formData.id,
                        title: formData.title,
                        date: formData.date,
                        startTime: startDateTime.toISOString(),
                        endTime: endDateTime.toISOString(),
                        email: formData.email,
                        link: meetLink
                    }
                })
            }).finally(() => setIsLoading(false));
            if (response.status === 401 || response.status === 403) {
                alert('Authentication failed! Redirecting to homepage.');
                navigate('/');
                return;
            }
            if (response.ok) {
                console.log("Meeting scheduled successfully!");
                onClose();
            } else {
                console.error("Failed to schedule meeting.");
            }
        } catch (error) {
            console.error("Error submitting form:" ,error);
        }
    };

    return (
        <>
            {isLoading && <Loading />}
            <div className={styles.popup}>
                <h2>Schedule New Meeting</h2>
                <form onSubmit={handleSubmit}>
                    <label>Meeting Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} />

                    <label>Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} min={new Date().toISOString().split("T")[0]}  />

                    <div className={styles.timeRow}>
                        <div>
                            <label>Start Time</label>
                            <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} />
                        </div>
                        <div>
                            <label>End Time</label>
                            <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
                        </div>
                    </div>

                    <label>Parent Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter parent's email address"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <p className={styles.note}>An email with the meeting link will be sent to this address.</p>

                    <div className={styles.actions}>
                        <button type="button" className={styles.cancel} onClick={onClose}>Cancel</button>
                        <button type="submit" className={styles.schedule}>Schedule Meeting</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ModalInfo;