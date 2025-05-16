import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

function Home () {
    const navigate = useNavigate()
    const location = useLocation();
    const currentLink = location.state?.currentLink;
    const channelName = currentLink?.split('/').pop();

    const handleStartCall = () => {
        if (!channelName) {
            alert("Channel not set. Schedule a meeting first.")
            return;
        }
        navigate(`/join/${channelName}`)
    }
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Video Call</h1>
            <button onClick={handleStartCall} style={{ padding: '10px 20px' }}>
                Start a New Call
            </button>

        </div>
    )
}

export default Home
