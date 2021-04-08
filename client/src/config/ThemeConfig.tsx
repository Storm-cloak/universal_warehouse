import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Alegreya Sans",
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      fontStyle: "normal",
    },
  },
  palette: {
    background: {
      default: "#2C5CCA",
    },
    primary: {
      main: "#2C5CCA",
      light: "#FFFFFF",
    },
    secondary: {
      main: "#919399",
    },
  },
});

export default theme;
