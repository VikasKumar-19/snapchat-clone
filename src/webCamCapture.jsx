import { Chat, RadioButtonChecked } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { setCameraImage } from "./features/cameraSlice";
import "./webcamCapture.css";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

const WebCamCapture = () => {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imgSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imgSrc));
    navigate("/preview");
  }, [webcamRef]);

  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        width={videoConstraints.width}
        height={videoConstraints.height}
        videoConstraints={videoConstraints}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <IconButton className="webcamCapture__button" onClick={capture}>
        <RadioButtonChecked fontSize="large" />
      </IconButton>
      <Link to="/chats">
        <Chat className="goToChat" />
      </Link>
    </div>
  );
};

export default WebCamCapture;
