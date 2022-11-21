import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { auth, provider } from "./firebase";
import snapChatLogo from "./assets/snapchat.png";
import "./login.css";
import { login } from "./features/appSlice";

const Login = () => {
  const dispatch = useDispatch();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          login({
            userName: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src={snapChatLogo} alt="snapchat logo" />
      </div>
      <Button className="loginBtn" variant="outlined" onClick={signIn}>
        Sign IN
      </Button>
    </div>
  );
};

export default Login;
