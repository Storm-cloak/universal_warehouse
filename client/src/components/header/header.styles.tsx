import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      background: "rgba(0, 0, 0, 0.6)",
    },
    toolBar: {
      minHeight: 40,
    },
    title: {
      marginRight: 20,
      paddingRight: 20,
      borderRight: `1px solid rgba(255, 255, 255, 0.24)`,
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
      paddingRight: 20,
    },
    icon: {
      fontSize: 24,
      color: theme.palette.secondary.main,
      paddingRight: 6,
    },
    subOptionIcon: {
      fontSize: 30,
      paddingRight: 10,
      color: theme.palette.primary.main,
    },
    grow: {
      flex: 1,
    },
  })
);
