//======================================================================================\\
//                               IMPORTS                                                \\
//======================================================================================\\
import React, { useState, useMemo, useEffect } from "react";
import { useFetchProductsTreeViewQuery } from "../../../graphql/generated/graphql";
import {
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Menu,
  MenuItem,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { reshapeData } from "../../../config/utils";
import { TabPanel } from "../../../components/TabPanels/tabpanel.component";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";
import {
  fade,
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem, { TreeItemProps } from "@material-ui/lab/TreeItem";
import Collapse from "@material-ui/core/Collapse";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import { TransitionProps } from "@material-ui/core/transitions";
//======================================================================================\\
//                               ICONS                                                  \\
//======================================================================================\\
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ArrowDropDownCircleOutlinedIcon from "@material-ui/icons/ArrowDropDownCircleOutlined";
function MinusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props: SvgIconProps) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

//======================================================================================\\
//                                STYLES                                                \\
//======================================================================================\\
function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const StyledTreeItem = withStyles((theme: Theme) =>
  createStyles({
    iconContainer: {
      "& .close": {
        opacity: 0.3,
      },
    },
    group: {
      marginLeft: 7,
      paddingLeft: 18,
      borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
    },
  })
)((props: TreeItemProps) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      // width: "25%",
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
export interface INode {
  id: number;
  parentId?: number;
  title: any;
  title2: any;
  storageId: number;
  nodeId: string;
  children?: INode[];
}
interface IProps {
  handleClick: (id: number) => void;
}

const initialState = {
  mouseX: null,
  mouseY: null,
};
//======================================================================================\\
//                                MAIN LOGIC OF TREE RENDERING                          \\
//======================================================================================\\
const TreeViewData = ({ handleClick }: IProps) => {
  const {
    loading: loadingDataTreeView,
    error: errorTreeView,
    data: dataTreeView,
  } = useFetchProductsTreeViewQuery();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [mouse, setMouse] = useState<{
    mouseX: null | number;
    mouseY: null | number;
  }>(initialState);
  const [searchValue, setSearchValue] = useState<string>("");

  //memoized reshaped data in order to prevent extra calculations on re-render
  const cachedReshapedTreeData: INode[] = useMemo(() => {
    if (loadingDataTreeView || errorTreeView) return null;
    return reshapeData(dataTreeView, searchValue);
  }, [dataTreeView, searchValue]);

  //Change tab
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  //ContextMenu Handlers
  const handleClickContextMenu = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    setMouse({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };
  const handleCloseContextMenu = () => {
    setMouse(initialState);
  };

  // Render tree recursively function
  const renderTree = (nodes: INode) => (
    <React.Fragment key={nodes.id}>
      <StyledTreeItem
        onContextMenu={(event) => handleClickContextMenu(event)}
        onLabelClick={
          nodes.children?.length ? undefined : () => handleClick(nodes.id)
        }
        nodeId={nodes.nodeId}
        label={nodes.title["AZ"]}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node: INode) => renderTree(node))
          : null}
      </StyledTreeItem>
    </React.Fragment>
  );
  // Render tabs function
  const renderTabs = () => (
    <>
      <Paper square>
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
    </>
  );
  //Circular progress icon if data fetching in loading process.

  if (loadingDataTreeView || errorTreeView) {
    return (
      <div className={classes.root}>
        {renderTabs()}
        <CircularProgress className={classes.circleProgress} color="primary" />
      </div>
    );
  }

  return (
    <>
      {dataTreeView && cachedReshapedTreeData && (
        <div className={classes.root}>
          <Autocomplete
            forcePopupIcon={false}
            id="controllable-autocomplete"
            options={dataTreeView.warehouses!.nodes}
            getOptionLabel={(option) => option?.title["AZ"]}
            inputValue={searchValue}
            onInputChange={(event, newInputValue) => {
              setSearchValue(newInputValue);
            }}
            closeIcon={
              <HighlightOffIcon
                style={{ paddingBottom: "3px" }}
                color="primary"
              ></HighlightOffIcon>
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Axtarış"
                margin="dense"
                variant="standard"
                InputProps={{ ...params.InputProps, type: "search" }}
              />
            )}
          />
          {renderTabs()}
          <TabPanel value={value} index={0}>
            <TreeView
              // className={classes.root}
              defaultExpanded={dataTreeView.warehouses!.nodes.map(
                (node) => node!.nodeId
              )}
              defaultCollapseIcon={<MinusSquare />}
              defaultExpandIcon={<PlusSquare />}
              defaultEndIcon={<CloseSquare />}
            >
              {cachedReshapedTreeData.map((nodes: INode) =>
                nodes ? renderTree(nodes) : null
              )}
            </TreeView>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          {/* context menu, rendering if open */}
          <Menu
            keepMounted
            open={mouse.mouseY !== null}
            onClose={handleCloseContextMenu}
            anchorReference="anchorPosition"
            anchorPosition={
              mouse.mouseY !== null && mouse.mouseX !== null
                ? { top: mouse.mouseY, left: mouse.mouseX }
                : undefined
            }
          >
            <MenuItem onClick={handleCloseContextMenu}>Update</MenuItem>
            <MenuItem onClick={handleCloseContextMenu}>Delete</MenuItem>
            <MenuItem onClick={handleCloseContextMenu}>Create</MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
};

export default TreeViewData;
