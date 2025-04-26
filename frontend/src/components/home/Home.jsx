import React from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'



function Home () {
    const navigate = useNavigate()

    const handleStartCall = () => {
        const channel = uuidv4()
        navigate(`/join/${channel}`)
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
