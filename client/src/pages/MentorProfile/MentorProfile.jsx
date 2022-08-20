import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classes from './mentorProfile.module.css'
import { useParams } from "react-router";
import { v4 as uuid } from "uuid";

export default function MentorProfile() {

    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [twitter, setTwitter] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");

    const [bio, setBio] = useState("Enter your bio")
    const [editInfo, setEditInfo] = useState(false);
    const [editBio, setEditBio] = useState(false);
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [createRoom, setCreateRoom] = useState(false)
    const [newRoomName, setNewRoomName] = useState('')

    const [rooms, setRooms] = useState([])

    let { mail } = useParams()

    const navigate = useNavigate()

    const getData = async () => {
        const req = await fetch(`http://localhost:4000/mentor/${mail}`)
        const mentor = await req.json()
        if (mentor['mentor'][0]) {
            setBio(mentor['mentor'][0].bio)
            setFacebook(mentor['mentor'][0].facebook)
            setInstagram(mentor['mentor'][0].instagram)
            setTwitter(mentor['mentor'][0].twitter)
            setGithub(mentor['mentor'][0].github)
            setLinkedin(mentor['mentor'][0].linkedin)
            setName(mentor['mentor'][0].name)
            setEmail(mentor['mentor'][0].email)
            setRooms(mentor['mentor'][0].rooms)
        }
        else {
            navigate('/')
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const update = async (e) => {
        e.preventDefault()
        const req = await fetch(`http://localhost:4000/mentor/${mail}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                bio,
                facebook,
                instagram,
                twitter,
                github,
                linkedin,
            })
        })
        setEditInfo(false)
        setEditBio(false)
        const result = await req.json()
    }

    const createNewRoom = async (e) => {
        setCreateRoom(false)
        if (newRoomName === "") {
            return
        }
        const newRoom = {
            name: newRoomName,
            roomId: uuid()
        }
        e.preventDefault()
        const req = await fetch(`http://localhost:4000/mentor/${mail}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                rooms: [
                    ...rooms, newRoom
                ]
            })
        })
        const result = await req.json()
        console.log(result)
    }

    return (
        <div className={classes.MainDiv}>
            <div className={classes.profileMaindiv}>
                <div className={classes.profileLeftdiv}>
                    <h1>MY Profile</h1>
                </div>
                <div className={classes.profileRightdiv}>
                    <div className={classes.basicDetails}>
                        <h1 style={{ color: '#6225E6', fontSize: '1.4rem', marginBottom: '1rem' }}>Hey!</h1>
                        <h1>{name}</h1>
                        <h3><span>Email: </span>a{email}</h3>
                        <div>
                            <div style={{ marginTop: "2rem", marginBottom: "2rem" }} className={classes.wrapper}>
                                {facebook !== '' ? <a href={facebook} target="_blank" style={{ color: "#4267b2" }}>
                                    <div className={classes.button}>
                                        <div className={classes.icon}>
                                            <i className="fab fa-facebook-f" />
                                        </div>
                                        <span>Facebook</span>
                                    </div>
                                </a> : ''}
                                {twitter !== '' ? <a href={twitter} target="_blank" style={{ color: "#1da1f2" }}>
                                    <div className={classes.button}>
                                        <div className={classes.icon}>
                                            <i className="fab fa-twitter" />
                                        </div>
                                        <span>Twitter</span>
                                    </div></a> : ''}
                                {instagram !== '' ? <a href={instagram} target="_blank" style={{ color: "#e1306c" }}>
                                    <div className={classes.button}>
                                        <div className={classes.icon}>
                                            <i className="fab fa-instagram" />
                                        </div>
                                        <span>Instagram</span>
                                    </div></a> : ''}
                                {github !== '' ? <a href={github} target="_blank" style={{ color: "#333" }}>
                                    <div className={classes.button} >
                                        <div className={classes.icon}>
                                            <i className="fab fa-github" />
                                        </div>
                                        <span>Github</span>
                                    </div></a> : ''}
                                {linkedin !== '' ? <a href={linkedin} target="_blank" style={{ color: "#0077b5" }}>
                                    <div className={classes.button}>
                                        <div className={classes.icon}>
                                            <i className="fab fa-linkedin" />
                                        </div>
                                        <span>Linkedin</span>
                                    </div></a> : ''}
                            </div>
                            <div onClick={() => setEditInfo(true)} className={classes.editButton}><h1>Edit Links</h1></div>
                        </div>
                        {editInfo ?
                            <div className={classes.editContainer}>
                                <input style={{ width: '80%', marginLeft: '0' }} className="inputBox" placeholder='Facebook' onChange={(e) => setFacebook(e.target.value)} value={facebook} ></input>
                                <input style={{ width: '80%', marginLeft: '0' }} className="inputBox" placeholder='Twitter' onChange={(e) => setTwitter(e.target.value)} value={twitter} ></input>
                                <input style={{ width: '80%', marginLeft: '0' }} className="inputBox" placeholder='Instagram' onChange={(e) => setInstagram(e.target.value)} value={instagram} ></input>
                                <input style={{ width: '80%', marginLeft: '0' }} className="inputBox" placeholder='GitHub' onChange={(e) => setGithub(e.target.value)} value={github} ></input>
                                <input style={{ width: '80%', marginLeft: '0' }} className="inputBox" placeholder='Linkedin' onChange={(e) => setLinkedin(e.target.value)} value={linkedin}></input>
                                <div style={{ backgroundColor: 'green' }} className={classes.editButton} onClick={update}><h1>Save</h1></div>
                            </div>
                            :
                            <></>
                        }

                    </div>
                    <div className={classes.basicDetails}>
                        <h1>Bio</h1>
                        <h3 style={{ margin: '2rem', marginLeft: '0' }}>{bio}</h3>
                        <div onClick={() => setEditBio(true)} className={classes.editButton}><h1>Edit Bio</h1></div>
                        {editBio ?
                            <div>
                                <textarea className={classes.textArea}></textarea>
                                <div style={{ backgroundColor: 'green', marginTop: "2rem" }} className={classes.editButton} onClick={update}><h1>Save</h1></div>
                            </div>
                            :
                            <></>
                        }
                    </div>
                    <div className={classes.basicDetails}>
                        <h1>Rooms</h1>
                        {rooms.map((room, index) => {
                            return <div className={classes.roomDiv} style={{ marginLeft: "0" }} key={index}><h3>{room.name}</h3><div className={classes.viewRoomButton}>View</div></div>
                        })}
                        {createRoom === false ? <div style={{ backgroundColor: 'green', marginTop: "2rem" }} className={classes.editButton} onClick={() => setCreateRoom(true)}><h1>Create room</h1></div> :
                            (<>
                                <input style={{ width: '80%', marginLeft: '0' }} className="inputBox" placeholder='Room Name' onChange={(e) => setNewRoomName(e.target.value)} value={newRoomName} ></input>
                                <div style={{ backgroundColor: 'green', marginTop: "2rem" }} className={classes.editButton} onClick={createNewRoom}><h1>Save room</h1></div>
                            </>)}
                    </div>

                </div>

            </div>

        </div >
    )
}