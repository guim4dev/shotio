import React, { useEffect, useState } from "react";
import { IconButton, Typography, Container } from "@material-ui/core";
import { Mic } from "@material-ui/icons";
import useStyles from "./styles";
import { useDispatch } from "react-redux";

import BlobActions from "~/store/ducks/blob";

function Main() {
  const classes = useStyles();
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRec = new MediaRecorder(stream);
      mediaRec.addEventListener("dataavailable", (event) => {
        onData(event.data);
      });
      setMediaRecorder(mediaRec);
    });
  }, []);

  const onData = (chunk) => {
    dispatch(BlobActions.sendBlobRequest(
      new Blob(chunk, {'type': 'audio/wav; codecs = MS_PCM'})
    ));
  };

  const onStop = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  const onStart = () => {
    mediaRecorder.start(2000);
    setRecording(true);
  };

  const toggleRecord = () => {
    if (recording) onStop();
    else onStart();
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <h1
        style={{
          fontFamily: "Comic Sans MS",
          color: "purple",
          fontSize: "5em",
          textAlign: "center",
          verticalAlign: "top",
        }}
      >
        shot.io
      </h1>
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
