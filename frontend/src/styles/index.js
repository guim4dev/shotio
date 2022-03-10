import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#328a49",
    },
    secondary: {
      main: "#e8f5e9",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: 5,
        },
        "*::-webkit-scrollbar-track": {
          backgroundColor: "rgba(0, 0, 0, 0)",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: 5,
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
        body: {
          backgroundColor: "#E5E5E5",
        },
        "input::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: 0,
        },
        "input[type=number]": {
          "-moz-appearance": "textfield",
        },
      },
    },
  },
});
