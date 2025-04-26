import styles from './MeetInfo.module.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Context from "../../Context.jsx";

function MeetInfo({data, onClose, onDelete}) {
    const navigate = useNavigate();
    const { title, date,startTime, endTime, email, link } = data;
    const [copied,setCopied]=useState(false);
    const handleCopy= async()=>{
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };
    const handleResendEmail = async () => {
        try {
            const response = await fetch('http://localhost:8080/resendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    schedule: {
                        id: data.id,
                        title: data.title,
                        date: data.date,
                        startTime: data.startTime,
                        endTime: data.endTime,
                        email: data.email,
                        link: data.link
                    }
                })
            });

            const result = await response.json();
            if (response.ok) {
                alert('Email resent successfully!');
            } else {
                alert('Failed to resend email: ' + result.message);
            }
        } catch (error) {
            console.error('Error resending email:', error);
            alert('Error resending email.');
        }
    };
    return (
        <div className={styles.cardContainer}>
            <div className={styles.title} >{title}</div>
            <div className={styles.dayDate}>
                <svg className={styles.svg} width="64" height="67" viewBox="0 0 64 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M45.5867 7.01333H17.5333V8.76667C17.5333 9.73501 16.7483 10.52 15.78 10.52C14.8117 10.52 14.0267 9.73501 14.0267 8.76667V7.01333H8.76667C5.86165 7.01333 3.50667 9.36832 3.50667 12.2733V21.04H59.6133V12.2733C59.6133 9.36832 57.2584 7.01333 54.3533 7.01333H49.0933V8.76667C49.0933 9.73501 48.3083 10.52 47.34 10.52C46.3717 10.52 45.5867 9.73501 45.5867 8.76667V7.01333ZM49.0933 3.50667H54.3533C59.195 3.50667 63.12 7.43164 63.12 12.2733V57.8858C63.12 62.7275 59.195 66.6524 54.3533 66.6524H8.76667C3.92497 66.6524 0 62.7275 0 57.8858V12.2733C0 7.43164 3.92497 3.50667 8.76667 3.50667H14.0267V1.75333C14.0267 0.784994 14.8117 0 15.78 0C16.7483 0 17.5333 0.784994 17.5333 1.75333V3.50667H45.5867V1.75333C45.5867 0.784994 46.3717 0 47.34 0C48.3083 0 49.0933 0.784994 49.0933 1.75333V3.50667ZM59.6133 24.5467H3.50667V57.8858C3.50667 60.7908 5.86165 63.1458 8.76667 63.1458H54.3533C57.2584 63.1458 59.6133 60.7908 59.6133 57.8858V24.5467Z" fill="black"/>
                </svg> Date
                <p>
                    {date}
                </p>
                </div>
            <div className={styles.time}>
                <svg className={styles.svg} width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.56 63.12C14.1506 63.12 0 48.9694 0 31.56C0 14.1506 14.1506 0 31.56 0C48.9694 0 63.12 14.1506 63.12 31.56C63.12 48.9694 48.9694 63.12 31.56 63.12ZM31.56 4.40372C16.5873 4.40372 4.40372 16.5873 4.40372 31.56C4.40372 46.5327 16.5873 58.7163 31.56 58.7163C46.5327 58.7163 58.7163 46.5327 58.7163 31.56C58.7163 16.5873 46.5327 4.40372 31.56 4.40372Z" fill="#292D32"/>
                    <path d="M42.4507 43.0977C42.069 43.0977 41.6874 43.0097 41.3351 42.7748L32.2341 37.3436C29.9735 35.9931 28.3001 33.0279 28.3001 30.415V18.3782C28.3001 17.1745 29.2983 16.1764 30.5019 16.1764C31.7056 16.1764 32.7038 17.1745 32.7038 18.3782V30.415C32.7038 31.4719 33.5845 33.0279 34.4946 33.5564L43.5957 38.9876C44.6526 39.6041 44.9755 40.9546 44.359 42.0115C43.9186 42.7161 43.1847 43.0977 42.4507 43.0977Z" fill="#292D32"/>
                </svg> Time
                <p>
                    {new Date(startTime).toLocaleTimeString("en-US", {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    })} - {new Date(endTime).toLocaleTimeString("en-US", {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                })}
                </p>
                </div>
            <div className={styles.mail}>
                <svg className={styles.svg} width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M55.23 11.835H7.89001C6.84373 11.835 5.8403 12.2506 5.10047 12.9905C4.36064 13.7303 3.94501 14.7337 3.94501 15.78V47.34C3.94501 48.3863 4.36064 49.3897 5.10047 50.1295C5.8403 50.8694 6.84373 51.285 7.89001 51.285H55.23C56.2763 51.285 57.2797 50.8694 58.0195 50.1295C58.7594 49.3897 59.175 48.3863 59.175 47.34V15.78C59.175 14.7337 58.7594 13.7303 58.0195 12.9905C57.2797 12.2506 56.2763 11.835 55.23 11.835ZM50.8905 15.78L31.56 29.1535L12.2295 15.78H50.8905ZM7.89001 47.34V17.575L30.4357 33.1774C30.7659 33.4065 31.1581 33.5293 31.56 33.5293C31.9619 33.5293 32.3541 33.4065 32.6843 33.1774L55.23 17.575V47.34H7.89001Z" fill="black"/>
                </svg> Parent
                <p>
                    {email}
                </p>
                </div>
            <div className={styles.link}>
                <svg className={styles.svg}  width="69" height="65" viewBox="0 0 69 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M39.535 12.552C39.535 12.552 54.4599 -2.37297 61.9224 5.08949C69.3848 12.552 66.8973 22.5019 54.4599 32.4519C42.0225 42.4018 34.56 44.8893 29.585 34.9393M29.585 52.3518C29.585 52.3518 14.6601 67.2767 7.19764 59.8142C-0.264827 52.3518 2.22266 42.4018 14.6601 32.4519C27.0975 22.5019 34.56 20.0144 39.535 29.9644" stroke="black" strokeWidth="4.97498" strokeLinecap="round" strokeLinejoin="round"/>
                </svg> Meeting Link
                <div className={styles.linkContainer}>
                    <input type="text" value={data.link} readOnly className={styles.linkBox} />
                    <button onClick={handleCopy} className={styles.copyBtn}>
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>
            </div>
            <button onClick={()=>navigate('/videoCall')}  style={{background:"var(--primary_color)" , color:"var(--tertiary_color)" , width:"95%" ,height:"150%", marginLeft: "1rem" , borderRadius: "0.5rem" , border:"none"}}>
                <svg className={styles.svg}   style={{paddingLeft:"0"}} width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.6799 16.8963V3.86866C18.6799 2.56042 17.6195 1.5 16.3112 1.5H6.86026H5L3.5 1.5H2C1.72386 1.5 1.5 1.72386 1.5 2V2L1.50708 3.86866V6.85318V16.8963C1.50708 18.2045 2.5675 19.265 3.87574 19.265H16.3112C17.6195 19.265 18.6799 18.2045 18.6799 16.8963ZM23.4172 3.86866V16.8963L18.6799 12.7511V8.01382L23.4172 3.86866Z" stroke="#FFF7F7" strokeWidth="1.7765" strokeLinejoin="round"/>
                </svg>

                Join Meeting
            </button>
            <button onClick={handleResendEmail} style={{background:"rgba(82, 80, 80, 0.29)" , color:"var(--text_color)" , width:"95%" ,height:"150%", marginLeft: "1rem" , borderRadius: "0.5rem" , border:"none"}}>
                <svg className={styles.svg}  style={{paddingRight:"0" }} width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M55.23 11.835H7.89001C6.84373 11.835 5.8403 12.2506 5.10047 12.9905C4.36064 13.7303 3.94501 14.7337 3.94501 15.78V47.34C3.94501 48.3863 4.36064 49.3897 5.10047 50.1295C5.8403 50.8694 6.84373 51.285 7.89001 51.285H55.23C56.2763 51.285 57.2797 50.8694 58.0195 50.1295C58.7594 49.3897 59.175 48.3863 59.175 47.34V15.78C59.175 14.7337 58.7594 13.7303 58.0195 12.9905C57.2797 12.2506 56.2763 11.835 55.23 11.835ZM50.8905 15.78L31.56 29.1535L12.2295 15.78H50.8905ZM7.89001 47.34V17.575L30.4357 33.1774C30.7659 33.4065 31.1581 33.5293 31.56 33.5293C31.9619 33.5293 32.3541 33.4065 32.6843 33.1774L55.23 17.575V47.34H7.89001Z" fill="black"/>
                </svg>
                Resend Invite
            </button>
            <div style={{display: "flex" , gap:"1rem", marginLeft:"1rem" }}>
                <button  onClick={onClose} style={{color: "var(--text_color)", width:"47.5%", height:"150%" , borderRadius:"0.5rem", border:"grey"}}>
                    Close
                </button>
                <button  onClick={() => onDelete(data.id)}
                         style={{background:"red" , color: "var(--tertiary_color)", width:"47.5%", height:"150%" , borderRadius:"0.5rem", border:"grey"}}>
                    Delete
                </button>
            </div>
        </div>
    )
}
export default MeetInfo