import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import RenderMenu from "./menu";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Badge,
  IconButton,
} from "@material-ui/core";
import { useStyles } from "./header.styles";
//======================================================================================\\
//                                 IMPORT ICONS                                         \\
//======================================================================================\\
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DomainIcon from "@material-ui/icons/Domain";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@material-ui/icons/IndeterminateCheckBoxOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import AssignmentLateOutlinedIcon from "@material-ui/icons/AssignmentLateOutlined";
import { useHistory } from "react-router";

//======================================================================================\\
//                              HEADER COMPONENT                                        \\
//======================================================================================\\
export default function Header() {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorType, setAnchorType] = useState<null | number>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    anchorType: number
  ) => {
    setAnchorEl(event.currentTarget);
    setAnchorType(anchorType);
    console.log(anchorType);
  };

  const handleMenuClick = (pageURL: any) => {
    setAnchorEl(null);
    setAnchorType(null);
    console.log(pageURL);
    history.push(pageURL);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchorType(null);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.header} position="static">
        <Toolbar className={classes.toolBar}>
          <Typography variant="h5" className={classes.title}>
            STDC
          </Typography>
          <Box className={classes.headerOptionsLeft}>
            <Box className={classes.headerOption}>
              <PieChartOutlinedIcon className={classes.icon} />
              <Typography variant="h6">Dashboard</Typography>
            </Box>
            <Box className={classes.headerOption}>
              <DomainIcon className={classes.icon} />
              <Typography variant="h6">Anbar</Typography>
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
              <AddBoxOutlinedIcon className={classes.icon} />
              <Typography variant="h6">Medaxil</Typography>
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
              <IndeterminateCheckBoxOutlinedIcon className={classes.icon} />
              <Typography variant="h6">Mexaric</Typography>
              <IconButton
                aria-label="show more"
                aria-haspopup="true"
                onClick={(e) => handleMenuOpen(e, 3)}
                color="inherit"
              >
                <ExpandMoreOutlinedIcon />
              </IconButton>
            </Box>
            <Box className={classes.headerOption}>
              <DescriptionOutlinedIcon className={classes.icon} />
              <Typography variant="h6">Hesabatlar</Typography>
            </Box>
            <Box className={classes.headerOption}>
              <AssignmentLateOutlinedIcon className={classes.icon} />
              <Typography variant="h6">Limitler</Typography>
            </Box>
            <Box className={classes.headerOption}>
              <DescriptionOutlinedIcon className={classes.icon} />
              <Typography variant="h6">Diger</Typography>
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
          <div className={classes.grow} />
          <Box className={classes.headerOptionsRight}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Typography variant="h6">UsernameHere</Typography>
            <AccountCircleOutlinedIcon className={classes.icon} />
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={(e) => handleMenuOpen(e, 5)}
              color="inherit"
            >
              <ExpandMoreOutlinedIcon />
            </IconButton>
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
    </div>
  );
}
