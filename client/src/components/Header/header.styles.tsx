import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: "rgb(16,33,81)", //dark blue
    },
    toolBar: {
      minHeight: 40,
    },
    title: {
      marginRight: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
      borderRight: "1px solid rgba(255, 255, 255, 0.24)",
    },
    headerOptionsLeft: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    subOptionsLeft: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      width: 232,
    },
    headerOptionsRight: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerOption: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingRight: theme.spacing(2.5), //20px
      "& a": {
        padding: 0,
      },
    },
    icon: {
      fontSize: 24,
      color: "#919399",
      paddingRight: theme.spacing(0.75), //6px
    },
    subOptionIcon: {
      fontSize: 30,
      paddingRight: theme.spacing(1.5),
      color: theme.palette.primary.main,
    },
    grow: {
      flex: 1,
    },
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      marginRight: theme.spacing(1),
    },
  })
);
