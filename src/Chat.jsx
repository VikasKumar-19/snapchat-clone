import { StopRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactTimeago from "react-timeago";
import "./chat.css";
import { selectImage, selectUser } from "./features/appSlice";
import { db } from "./firebase";

const Chat = ({ id, profilePic, userName, timestamp, imageUrl, seenBy }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const open = async () => {
    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, {
      seenBy: arrayUnion(user.id),
    });
    dispatch(selectImage(imageUrl));
    navigate("/chats/view");
  };

  return (
    <div onClick={open} className="chat">
      <Avatar className="chat__avatar" src={profilePic} />
      <div className="chat__info">
        <h4>{userName}</h4>
        <p>
          {!seenBy.includes(user.id) && "Tap to view - "}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>
      {!seenBy.includes(user.id) && <StopRounded className="chat__readIcon" />}
    </div>
  );
};

export default Chat;
