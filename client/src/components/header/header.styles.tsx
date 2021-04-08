import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
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
    headerOptionsRight: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerOption: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingRight: 10,
      "& button": {
        padding: 0,
      },
    },
    icon: {
      color: theme.palette.secondary.main,
      paddingRight: 6,
    },
    grow: {
      flex: 1,
    },
  })
);
