import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Alegreya Sans",
    h6: {
      fontSize: "1rem",
      // fontWeight: 500,
    },
  },
  palette: {
    background: {
      default: "red", //grey
    },
    primary: {
      main: "#254ECA", //blue
    },
    secondary: {
      main: "#FFF", //white
    },
  },
  shape: {
    borderRadius: 12,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          minHeight: "100vh",
        },
        html: {
          overflow: "hidden",
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: 0,
        color: "#FFFFFF",
        textTransform: "capitalize",
      },
    },
    MuiButton: {
      root: {
        padding: 0,
        color: "#FFFFFF",
        textTransform: "capitalize",
        minWidth: 50,
      },
    },
  },
});

export default theme;
