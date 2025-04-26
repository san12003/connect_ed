import React, {useContext, useEffect, useRef, useState} from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng'
import styles from './Videocall.module.css'
import axios from  'axios'
import {useParams} from "react-router-dom";
import Context from "../../Context.jsx";


const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })

const VideoCall = () => {
    const [localTracks, setLocalTracks] = useState([])
    const [joined, setJoined] = useState(false)
    const { channelName } = useParams()
    const videoContainerRef = useRef(null)
    const remoteUsers = useRef({})

    const {setMeetLink} = useContext(Context)

    const handleUserJoined = async (user, mediaType) => {
        await client.subscribe(user, mediaType)
        remoteUsers.current[user.uid] = user

        if (mediaType === 'video') {
            if (!document.querySelector(`[data-uid="${user.uid}"]`)) {
                addVideoElement(user.uid)
            }
            user.videoTrack.play(`user-${user.uid}`)
        }

        if (mediaType === 'audio') {
            user.audioTrack.play()
        }
    }

    useEffect(() => {
        client.on('user-published', handleUserJoined)
        client.on('user-left', handleUserLeft)

        return () => {
            client.off('user-published', handleUserJoined)
            client.off('user-left', handleUserLeft)
        }
    }, [])

    const getTokenAndJoin = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/generate-token?channel=${channelName}`)
            const { token, appId } = res.data
            const UID = await client.join(appId, channelName, token, null)

            const tracks = await AgoraRTC.createMicrophoneAndCameraTracks()
            setLocalTracks(tracks)

            addVideoElement(UID)
            tracks[1].play(`user-${UID}`)

            await client.publish(tracks)
            setJoined(true)
            setMeetLink(`${window.location.origin}/join/${channelName}`)
        } catch (error) {
            console.error('Failed to join the stream:', error)
        }
    }

    const addVideoElement = (uid) => {
        const container = document.createElement('div')
        container.className = styles.videoContainer
        container.setAttribute('data-uid', uid)

        const videoPlayer = document.createElement('div')
        videoPlayer.className = styles.videoPlayer
        videoPlayer.id = `user-${uid}`

        container.appendChild(videoPlayer)
        videoContainerRef.current.appendChild(container)
    }

    const handleUserLeft = (user) => {
        delete remoteUsers.current[user.uid]
        const container = document.querySelector(`[data-uid="${user.uid}"]`)
        if (container) container.remove()
    }

    const leaveStream = async () => {
        for (let track of localTracks) {
            track.stop()
            track.close()
        }

        await client.leave()
        setJoined(false)
        videoContainerRef.current.innerHTML = ''
    }

    const toggleMic = async (e) => {
        const micTrack = localTracks[0]
        if (micTrack) {
            await micTrack.setMuted(!micTrack.muted)
            e.target.innerText = micTrack.muted ? 'Mic off' : 'Mic on'
            e.target.style.backgroundColor = micTrack.muted ? '#EE4B2B' : 'cadetblue'
        }
    }

    const toggleCamera = async (e) => {
        const camTrack = localTracks[1]
        if (camTrack) {
            await camTrack.setMuted(!camTrack.muted)
            e.target.innerText = camTrack.muted ? 'Camera off' : 'Camera on'
            e.target.style.backgroundColor = camTrack.muted ? '#EE4B2B' : 'cadetblue'
        }
    }

    return (
        <div className={styles.container}>
            <div ref={videoContainerRef} className={styles.videoStreams}></div>
            <div className={styles.controls}>
                {!joined ? (
                    <button className={styles.button} onClick={getTokenAndJoin}>Join Stream</button>
                ) : (
                    <>
                        <button className={styles.button} onClick={leaveStream}>Leave Stream</button>
                        <button className={styles.button} onClick={toggleMic}>Mic on</button>
                        <button className={styles.button} onClick={toggleCamera}>Camera on</button>
                        <p className={styles.linkText}>Share this link to join:
                            <code>{window.location.origin}/join/{channelName}</code>
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}

export default VideoCall
