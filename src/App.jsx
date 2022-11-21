import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.css";
import { login, logout, selectUser } from "./features/appSlice";
import { auth } from "./firebase";
import Login from "./Login";
import snapChatLogo from "./assets/snapchat.png";

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            userName: user.displayName,
            profilePic: user.photoURL,
            id: user.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <img
            className="app__logo"
            src={snapChatLogo}
            alt={"snap chat logo"}
          />
          <div className="app__body">
            <div className="app__bodyBackground">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
