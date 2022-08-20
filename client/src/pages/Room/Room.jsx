import React, { useEffect, useState } from 'react'
import classes from './room.module.css'
import profile1 from '../../Assets/profile1.png'
import profile2 from '../../Assets/profile2.png'
import profile3 from '../../Assets/profile3.png'
import profile4 from '../../Assets/profile4.png'
import profile5 from '../../Assets/profile5.png'
import profile6 from '../../Assets/profile6.png'
import profile7 from '../../Assets/profile7.png'
import profile8 from '../../Assets/profile8.png'
import chatBackground from '../../Assets/chatsbackground.png'
import { useParams } from 'react-router-dom'

export default function Room() {

    const profilePhotos = [profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8];

    const [meetOption, setMeetOption] = useState("create")
    const [rooms, setRooms] = useState([])
    const [chatRoom, setChatRoom] = useState({ name: 'Select a room' })

    const [newMessage, setNewMessage] = useState('')

    const giveRandom = () => {
        return Math.floor(Math.random() * 7);
    }

    let { mail } = useParams()

    const Room = ({ room }) => {
        return (
            <div className={classes.team} onClick={() => updateChat(room)} style={{ cursor: 'pointer' }}>
                <img className={classes.teamImage} src={profilePhotos[giveRandom()]} alt="team"></img>
                <div className={classes.teamName}><h3>{room.name}</h3></div>
            </div>
        )
    }

    useEffect(() => {
        fetch(`http://localhost:4000/mentor/${mail}`).then(data => data.json()).then(data => setRooms(data['mentor'][0]['rooms']))
    }, [])

    const updateChat = (room) => {
        setChatRoom(room)
        fetch(`http://localhost:4000/room/${room.roomId}`).then(data => data.json()).then(data => setChatRoom(data['chatRoom'][0]))
    }

    return (
        <div className={classes.outerDiv} style={{
            backgroundImage: `url(${chatBackground})`, height: 'fitContent'
        }}>
            <div className={classes.searchDiv}>
                <input className={classes.searchTeamInput} placeholder="Search...."></input>
                <div className={classes.searchButton}>Search</div>
            </div>
            <div className={classes.roomDashboard}>
                <div className={classes.allTeams}>
                    {rooms && rooms.map((room, index) => {
                        return <Room key={index} room={room} />
                    })}
                </div>
                <div className={classes.roomChats} style={{
                    backgroundImage: `url(${chatBackground})`, height: 'fitContent'
                }}>
                    <div className={classes.teamDetailDiv}>
                        <div className={classes.teamDetails}>
                            <img className={classes.teamImage} src={profilePhotos[giveRandom()]} alt="team"></img>
                            <div className={classes.teamName}><h3 style={{ color: 'white' }}>{rooms && chatRoom.name}</h3></div>
                        </div>
                        {meetOption === "create" ?
                            <div className={classes.meetOptions}>
                                <h3>Schedule a Meet</h3>
                                <div><h1>Create</h1></div>
                            </div>
                            :
                            <div className={classes.meetOptions}>
                                <h3>Join meet at 8:00am</h3>
                                <div><h1>Join</h1></div>
                            </div>
                        }
                    </div>
                    <div className={classes.chatsDiv}>
                        {chatRoom.messages && chatRoom.messages.map((message, index) => {
                            return (
                                <div key={index}>
                                    <span > {message.name}</span>
                                    <h1>{message.content}</h1>
                                </div>
                            )
                        })}
                    </div>
                    <div className={classes.sendMessageDiv}>
                        <input className={classes.inputMessageBox} placeholder='Type a message'></input>
                        <div className={classes.sendButtton}>Send</div>
                    </div>
                </div>
            </div >
        </div >
    )
}
