import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Badge,
  Button,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { useStyles } from "./header.styles";
import { useHistory } from "react-router";
import { useLogout } from "../../config/auth";
import { UserContext, ContextType } from "../../context/UserContext";
import RenderMenu from "./menu";

//======================================================================================\\
//                                 IMPORT ICONS                                         \\
//======================================================================================\\
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DomainIcon from "@material-ui/icons/Domain";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@material-ui/icons/IndeterminateCheckBoxOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import AssignmentLateOutlinedIcon from "@material-ui/icons/AssignmentLateOutlined";

//======================================================================================\\
//                              HEADER COMPONENT                                        \\
//======================================================================================\\
export default function Header() {
  const logout = useLogout();
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorType, setAnchorType] = useState<null | number>(null);
  const isMenuOpen = Boolean(anchorEl);
  const { user } = useContext(UserContext) as ContextType;
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    anchorType: number
  ) => {
    setAnchorEl(event.currentTarget);
    setAnchorType(anchorType);
  };

  const handleMenuClick = (pageURL: string) => {
    setAnchorEl(null);
    setAnchorType(null);
    pageURL === "/logout" ? logout() : history.push(pageURL);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchorType(null);
  };

  return (
    <AppBar className={classes.header} position="sticky">
      <Toolbar variant="dense" className={classes.toolBar}>
        <Typography variant="h5" className={classes.title}>
          STDC
        </Typography>
        <Box className={classes.headerOptionsLeft}>
          <Box className={classes.headerOption}>
            <PieChartOutlinedIcon className={classes.icon} />
            <Button component={Link} to={"/"} color="default">
              <Typography variant="h6">Dashboard</Typography>
            </Button>
          </Box>
          <Box className={classes.headerOption}>
            <DomainIcon className={classes.icon} />
            <Typography variant="h6">Anbar</Typography>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <ExpandMoreOutlinedIcon />
            </IconButton>
          </Box>
          <Box className={classes.headerOption}>
            <AddBoxOutlinedIcon className={classes.icon} />
            <Typography variant="h6">Medaxil</Typography>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={(e) => handleMenuOpen(e, 1)}
              color="inherit"
            >
              <ExpandMoreOutlinedIcon />
            </IconButton>
          </Box>
          <Box className={classes.headerOption}>
            <IndeterminateCheckBoxOutlinedIcon className={classes.icon} />
            <Typography variant="h6">Mexaric</Typography>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={(e) => handleMenuOpen(e, 2)}
              color="inherit"
            >
              <ExpandMoreOutlinedIcon />
            </IconButton>
          </Box>
          <Box className={classes.headerOption}>
            <DescriptionOutlinedIcon className={classes.icon} />
            <Button component={Link} to={"/"} color="default">
              <Typography variant="h6">Hesabatlar</Typography>
            </Button>
          </Box>
          <Box className={classes.headerOption}>
            <AssignmentLateOutlinedIcon className={classes.icon} />
            <Button component={Link} to={"/"} color="default">
              <Typography variant="h6">Limitler</Typography>
            </Button>
          </Box>
          <Box className={classes.headerOption}>
            <DescriptionOutlinedIcon className={classes.icon} />
            <Typography variant="h6">Diger</Typography>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={(e) => handleMenuOpen(e, 3)}
              color="inherit"
            >
              <ExpandMoreOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
        <div className={classes.grow} />
        <Box className={classes.headerOptionsRight}>
          <Box className={classes.headerOption}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
          <Box className={classes.headerOption}>
            <Typography variant="h6">{user?.userfullname}</Typography>
          </Box>
          <Box className={classes.headerOption}>
            <Avatar className={classes.avatar}>
              {"".concat(
                user?.userfullname?.split(" ")[0][0],
                user?.userfullname?.split(" ")[1][0]
              )}
            </Avatar>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={(e) => handleMenuOpen(e, 4)}
              color="inherit"
            >
              <ExpandMoreOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
        <RenderMenu
          anchorEl={anchorEl}
          isMenuOpen={isMenuOpen}
          anchorType={anchorType}
          handleMenuClick={handleMenuClick}
          handleMenuClose={handleMenuClose}
        />
      </Toolbar>
    </AppBar>
  );
}
