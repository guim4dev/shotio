import React, { useEffect, useState } from "react";
import { IconButton, Typography, Container } from "@material-ui/core";
import { Mic } from "@material-ui/icons";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";

import BlobActions from "~/store/ducks/blob";

function Main() {
  const classes = useStyles();
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.blob);

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
    const newAudioChunks = audioChunks
    
    if (newAudioChunks.length !== 0)
      newAudioChunks[1] = chunk
    else
      newAudioChunks.push(chunk)

    setAudioChunks(newAudioChunks)
    dispatch(BlobActions.sendBlobRequest(new Blob([newAudioChunks[0], chunk])));
  };

  const onStop = () => {
    mediaRecorder.stop();
    setRecording(false);
    setAudioChunks([])
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
        <Typography component="h1" variant="h5">
          {`Probabilidade de tiro: ${(data.probability * 100).toFixed(2)}%`}
        </Typography>
        <Typography component="h1" variant="h5" className={classes.alert}>
          {data.result ? 'TIRO!!!' : ''}
        </Typography>
      </div>
    </Container>
  );
}

export default Main;
