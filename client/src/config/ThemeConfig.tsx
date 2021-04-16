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
      main: "#254ECA",
    },
    secondary: {
      main: "#919399",
    },
  },
  shape: {
    borderRadius: 0,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          height: "100%",
        },
        body: {
          height: "100%",
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
      },
    },
  },
});

export default theme;
