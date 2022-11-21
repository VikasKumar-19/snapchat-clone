import {
  AttachFile,
  Close,
  Create,
  Crop,
  MusicNote,
  Note,
  Send,
  TextFields,
  Timer,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";
import { db, storage } from "./firebase";
import { v4 as uuid } from "uuid";
import "./preview.css";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { selectUser } from "./features/appSlice";

const Preview = () => {
  const cameraImage = useSelector(selectCameraImage);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cameraImage) {
      navigate("/", { replace: true });
    }
  }, [cameraImage]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = () => {
    const id = uuid();
    const storageRef = ref(storage, `posts/${id}`);
    uploadString(storageRef, cameraImage, "data_url").then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          addDoc(collection(db, "posts"), {
            imageUrl: url,
            userName: "Vikas",
            profilePic: user.profilePic,
            timestamp: serverTimestamp(),
            seenBy: [],
          });
          navigate("/chats", { replace: true });
        })
        .catch((err) => alert(err.message));
    });
  };

  return (
    <div className="preview">
      <IconButton className="preview__close" onClick={closePreview}>
        <Close />
      </IconButton>
      <div className="preview__toolbarRight">
        <TextFields />
        <Create />
        <Note />
        <MusicNote />
        <AttachFile />
        <Crop />
        <Timer />
      </div>
      <img src={cameraImage} alt="preview image" />
      <div className="preview__footer">
        <h2>Send Now</h2>
        <IconButton onClick={sendPost} className="preview__sendIcon">
          <Send fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
};

export default Preview;
