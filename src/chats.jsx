import {
  ChatBubble,
  PowerSettingsNew,
  RadioButtonUnchecked,
  Search,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { signOut } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";
import "./chats.css";
import { logout, selectUser } from "./features/appSlice";
import { auth, db } from "./firebase";

const Chats = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      },
      (error) => {
        // ...
      }
    );

    return unsub;
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
      })
      .catch((err) => alert(err.message));
  };

  const takeSnap = () => {
    navigate("/");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar src={user.profilePic} className="chats__avatar" />
        <div className="chats__search">
          <Search className="chats__searchIcon" fontSize="small" />
          <input placeholder="Friends" type="text" />
        </div>
        <PowerSettingsNew
          onClick={handleLogout}
          fontSize="small"
          className="chats__logoutIcon"
        />
      </div>
      <div className="chat__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, userName, timestamp, imageUrl, seenBy },
          }) => (
            <Chat
              key={id}
              id={id}
              userName={userName}
              profilePic={profilePic}
              timestamp={timestamp}
              imageUrl={imageUrl}
              seenBy={seenBy}
            />
          )
        )}
      </div>
      <RadioButtonUnchecked
        className={"chats__takePicIcon"}
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
};

export default Chats;
