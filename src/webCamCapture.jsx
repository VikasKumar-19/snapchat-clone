import { RadioButtonChecked } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

const WebCamCapture = () => {
  const webcamRef = useRef(null);

  const capture = useCallback(
    () => {
      const imgSrc = webcamRef.current.getScreenshot();
      
    },
    [webcamRef],
  )
  

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
      <IconButton onClick={capture}>
        <RadioButtonChecked fontSize="large" className="webcamCapture_button" />
      </IconButton>
      <img src={image} alt="" />
    </div>
  );
};

export default WebCamCapture;
