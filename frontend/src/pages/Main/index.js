import React, { useEffect, useState } from "react";
import { IconButton, Typography, Container } from "@material-ui/core";

import { Mic } from "@material-ui/icons";

import useStyles from "./styles";

function Main() {
  const classes = useStyles();
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  let mediaRecorder;

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRec = new MediaRecorder(stream);
      mediaRec.addEventListener("dataavailable", (event) => {
        onData(event.data);
      });
      mediaRecorder = mediaRec;
    });
  });

  const onData = (chunk) => {
    console.log("chunk of real-time data is: ", recordedBlob);
    const newAudioChunks = audioChunks;
    newAudioChunks.push(event.data);
    setAudioChunks(newAudioChunks);
  };

  const onStop = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  const onStart = () => {
    mediaRecorder.start();
    setRecording(true);
  };

  const toggleRecord = () => {
    if (recording) onStop();
    else onStart();
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <div className={classes.paper}>
        <IconButton className={classes.button} onClick={() => toggleRecord()}>
          <Mic className={classes.icon} />
        </IconButton>
        <Typography component="h1" variant="h5">
          {recording ? "Gravando" : "Gravar"}
        </Typography>
      </div>
    </Container>
  );
}

export default Main;
