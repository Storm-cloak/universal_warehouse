import React from "react";
import TreeViewData from "./TreeView/treeview.component";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flex: 1,
    },
  })
);
const Dashboard = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <TreeViewData />
        <h1>RIGHT PART</h1>
      </div>
    </>
  );
};

export default Dashboard;
