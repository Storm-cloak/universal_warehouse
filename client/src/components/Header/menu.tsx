import { Menu, MenuItem, Box, Typography } from "@material-ui/core";
import { useStyles } from "./header.styles";
import Fade from "@material-ui/core/Fade";

//======================================================================================\\
//                                 IMPORT ICONS                                         \\
//======================================================================================\\
import DomainIcon from "@material-ui/icons/Domain";
import UndoIcon from "@material-ui/icons/Undo";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CloudOutlinedIcon from "@material-ui/icons/CloudOutlined";
import FindReplaceOutlinedIcon from "@material-ui/icons/FindReplaceOutlined";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BlurCircularIcon from "@material-ui/icons/BlurCircular";
import StorageIcon from "@material-ui/icons/Storage";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
//======================================================================================\\
//                                HEADER ROUTES DECLARATION                             \\
//======================================================================================\\
const menuItems = [
  //Medaxil routes
  [
    { menuTitle: "Medaxil", pageURL: "/warehouseincome", MenuIcon: DomainIcon },
    { menuTitle: "Arxiv", pageURL: "/", MenuIcon: CloudOutlinedIcon },
  ],
  // Mexaric routes
  [
    { menuTitle: "Mexaric", pageURL: "/", MenuIcon: UndoIcon },
    { menuTitle: "Transfer", pageURL: "/", MenuIcon: SwapHorizIcon },
    { menuTitle: "Silinme", pageURL: "/", MenuIcon: DeleteForeverIcon },
    { menuTitle: "Arxiv", pageURL: "/", MenuIcon: CloudOutlinedIcon },
  ],
  //Diger routes
  [
    {
      menuTitle: "Inventarizasiya",
      pageURL: "/",
      MenuIcon: FindReplaceOutlinedIcon,
    },
    { menuTitle: "Musteriler", pageURL: "/", MenuIcon: GroupOutlinedIcon },
    { menuTitle: "Anbarlar", pageURL: "/", MenuIcon: StorageIcon },
  ],
  //user Routes
  [
    { menuTitle: "Admin Panel", pageURL: "/", MenuIcon: BlurCircularIcon },
    { menuTitle: "Settings", pageURL: "/", MenuIcon: SettingsIcon },
    { menuTitle: "Logout", pageURL: "/logout", MenuIcon: ExitToAppIcon },
  ],
];

interface IMenuItem {
  menuTitle: string;
  pageURL: string;
  MenuIcon: React.ElementType<SvgIconProps>;
}

const RenderMenu = ({
  anchorEl,
  anchorType,
  isMenuOpen,
  handleMenuClick,
  handleMenuClose,
}: any) => {
  const classes = useStyles();
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      keepMounted
      getContentAnchorEl={null}
      elevation={8}
      open={isMenuOpen}
      onClose={handleMenuClose}
      TransitionComponent={Fade}
      // disableScrollLock
    >
      {anchorType &&
        menuItems[anchorType - 1].map((menuItem: IMenuItem, index) => {
          const { menuTitle, pageURL, MenuIcon } = menuItem;
          return (
            <MenuItem key={index} onClick={() => handleMenuClick(pageURL)}>
              <Box className={classes.subOptionsLeft}>
                <MenuIcon className={classes.subOptionIcon}></MenuIcon>
                <Typography variant="subtitle1">{menuTitle}</Typography>
              </Box>
            </MenuItem>
          );
        })}
    </Menu>
  );
};

export default RenderMenu;
