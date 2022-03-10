import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#f44336",
    height: 102,
    width: 102,
  },
  icon: {
    fontSize: 50,
    color: "white",
  },
}));
