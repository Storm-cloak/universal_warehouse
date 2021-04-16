import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 444,
      margin: "0 auto",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    paper: {
      width: "100%",
      margin: "20px auto",
      borderRadius: 8,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
      width: "100%",
    },
    submit: {
      width: 212,
      height: 40,
      margin: 40,
      borderRadius: 12,
    },
    captionTop: {
      padding: 25.5,
      borderBottom: `1px solid rgba(0, 16, 61, 0.12)`,
    },
    captionBottom: {
      borderTop: `1px solid rgba(0, 16, 61, 0.12)`,
      color: "#919399",
      marginTop: 80,
      padding: 20,
    },
    captionFooter: {
      borderTop: `1px solid rgba(255, 255, 255, 0.24)`,
      padding: 20,
      position: "fixed",
      bottom: 0,
      width: "40%",
      margin: "0 auto",
      color: "#FFFFFF",
      textAlign: "center",
      "& p": {
        fontSize: "16px",
        lineHeight: "20px",
      },
    },
  })
);
