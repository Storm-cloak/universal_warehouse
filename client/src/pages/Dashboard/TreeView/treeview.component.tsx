//======================================================================================\\
//                               IMPORTS                                                \\
//======================================================================================\\
import React, { useState, useMemo } from "react";
import { useFetchProductsTreeViewQuery } from "../../../graphql/generated/graphql";
import {
  Paper,
  Tabs,
  Tab,
  Divider,
  CircularProgress,
  LinearProgress,
} from "@material-ui/core";
import { reshapeData } from "../../../config/utils";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import { TabPanel } from "./tabpanel.component";
//======================================================================================\\
//                               ICONS                                                  \\
//======================================================================================\\
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      minWidth: "22%",
      height: "100%",
      position: "relative",
    },
    circleProgress: {
      position: "absolute",
      top: "50%",
      left: "40%",
    },
  })
);

//======================================================================================\\
//                                INTERFACES AND SCHEMAS                                \\
//======================================================================================\\
interface INode {
  id: number;
  parentId: number | null;
  title: any;
  title2: any;
  storageId: number;
  nodeId: string;
  children?: INode[];
}

//======================================================================================\\
//                                MAIN LOGIC OF TREE RENDERING                          \\
//======================================================================================\\
const TreeViewData = () => {
  const {
    loading: loadingDataTreeView,
    error: errorTreeView,
    data: dataTreeView,
  } = useFetchProductsTreeViewQuery();
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  //memoized reshaped data in order to prevent extra calculations on re-render
  const cachedReshapedData: any = useMemo(() => {
    if (loadingDataTreeView || errorTreeView) return null;
    return reshapeData(dataTreeView);
  }, [loadingDataTreeView, errorTreeView, dataTreeView]);

  //Render tree recursively
  const renderTree = (nodes: INode) => (
    <React.Fragment key={nodes.id}>
      <TreeItem nodeId={nodes.nodeId} label={nodes.title["AZ"]}>
        <Divider />
        {Array.isArray(nodes.children)
          ? nodes.children.map((node: INode) => renderTree(node))
          : null}
      </TreeItem>
    </React.Fragment>
  );
  {
    if (1) {
      return (
        <div className={classes.root}>
          <Paper>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Məhsullar" />
              <Tab label="Vendorlar" />
            </Tabs>
          </Paper>
          <CircularProgress
            className={classes.circleProgress}
            color="primary"
          />
        </div>
      );
    }
  }
  return (
    <>
      {dataTreeView && (
        <div className={classes.root}>
          <Paper>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Məhsullar" />
              <Tab label="Vendorlar" />
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
            <input type="text" />
            <TreeView
              // className={classes.root}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpanded={["root"]}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              {renderTree(cachedReshapedData)}
            </TreeView>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
        </div>
      )}
    </>
  );
};

export default TreeViewData;
