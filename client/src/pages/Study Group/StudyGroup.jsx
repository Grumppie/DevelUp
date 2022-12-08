import React, { useEffect, useState } from "react";
import classes from "./studyGroup.module.css";
import background from "../../Assets/studyBackground.png";
import profile1 from "../../Assets/profile1.png";
import profile2 from "../../Assets/profile2.png";
import profile3 from "../../Assets/profile3.png";
import profile4 from "../../Assets/profile4.png";
import profile5 from "../../Assets/profile5.png";
import profile6 from "../../Assets/profile6.png";
import profile7 from "../../Assets/profile7.png";
import profile8 from "../../Assets/profile8.png";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export default function StudyGroup() {
  const profilePhotos = [
    profile1,
    profile2,
    profile3,
    profile4,
    profile5,
    profile6,
    profile7,
    profile8,
  ];
  const giveRandom = () => {
    return Math.floor(Math.random() * 1);
  };
  const [query, setQuery] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/rooms`)
      .then((data) => data.json())
      .then((data) => {
        setRooms(data.rooms);
      });
  }, []);

  const navigate = useNavigate();

  const sendRequest = (room) => {
    const request = {};
    fetch(`http://localhost:4000/requests/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request: localStorage.getItem("name"),
        roomId: room.roomId,
      }),
    })
      .then((data) => data.json())
      .then((data) => console.log(data));
  };

  const Studygrp = ({ room, index }) => {
    return (
      <div className={classes.studyGroup}>
        <div className={classes.groupDiv}>
          <div className={classes.studyGroupDetails}>
            <img
              className={classes.studyGroupImg}
              src={profilePhotos[giveRandom()]}
              alt="profile"
            ></img>
            <h3 style={{ marginLeft: "1rem", fontSize: "1.4rem" }}>
              {room.name}
            </h3>
          </div>
          <div
            className={classes.viewButton}
            onClick={() => {
              sendRequest(room);
              alert("request sent");
            }}
          >
            send request
          </div>
        </div>
        <h3 style={{ paddingTop: "2rem", textAlign: "left" }}></h3>
      </div>
    );
  };
  console.log(rooms);
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: "fitContent",
        padding: "2rem",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          textAlign: "center",
          padding: "2rem",
          paddingTop: "5.2rem",
          color: "#277BC0",
        }}
      >
        Study Groups
      </h1>
      <motion.div
        initial={{ y: -10, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
        className={classes.studyGroupDiv}
      >
        <h1 style={{ color: "#A2B5BB", marginTop: "2rem" }}>
          {" "}
          Search Your favorite group here
        </h1>
        <div className={classes.searchDiv}>
          <input
            style={{ width: "60%" }}
            className="inputBox"
            placeholder="Codery..."
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <div style={{ width: "20%" }}>
            <Button name="Search"></Button>
          </div>
        </div>
        <div className={classes.allGroups}>
          {rooms &&
            rooms
              .filter((val) => {
                if (
                  query == "" ||
                  val.name.toLowerCase().includes(query) == true
                ) {
                  return val;
                }
              })
              .map((room) => {
                return <Studygrp room={room} />;
              })}
        </div>
      </motion.div>
    </div>
  );
}
