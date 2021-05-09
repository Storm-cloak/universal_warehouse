//======================================================================================\\
//                                 IMPORTS                                              \\
//======================================================================================\\
import TreeViewData from "./TreeView/treeview.component";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import SingleProductInfo from "./ProductsInfo/SingleProductInfo";
import OverallProductsInfo from "./ProductsInfo/OverallProductsInfo";

//======================================================================================\\
//                                 LITTLE BIT OF STYLES                                 \\
//======================================================================================\\
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flex: "1 auto",
    },
  })
);

//======================================================================================\\
//                                 RENDER DASHBOARD                                     \\
//======================================================================================\\
const Dashboard = () => {
  const classes = useStyles();
  const [singleProductId, setSingleProductId] = useState<number>(0);
  //clickable for item in tree which has no children
  //open SingleProductInfo component
  const handleClick = (id: number) => {
    setSingleProductId(id);
    console.log(id);
  };
  return (
    <div className={classes.root}>
      <TreeViewData handleClick={handleClick} />
      {singleProductId ? (
        <SingleProductInfo
          handleClick={handleClick}
          productId={singleProductId}
        />
      ) : (
        <OverallProductsInfo />
      )}
    </div>
  );
};

export default Dashboard;
