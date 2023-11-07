import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";

import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import AddIcon from "@mui/icons-material/Add";
import TableViewIcon from "@mui/icons-material/TableView";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import { Link } from "react-router-dom";
import AdminStyle from "../../AdminLayout/AdminStyle.module.css";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DrawerAdmin() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [menuData, setMenuData] = useState({
    selectedMenu: "User",
    userMenuOpen: false,
    LocationMenuOpen: false,
    RoomMenuOpen: false,
  });

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleUserClick = () => {
    setMenuData((prevState) => ({
      ...prevState,
      selectedMenu: "User",
      userMenuOpen: !prevState.userMenuOpen,
    }));
  };

  const handleLocationClick = () => {
    setMenuData((prevState) => ({
      ...prevState,
      selectedMenu: "Quản lí vị trí",
      LocationMenuOpen: !prevState.LocationMenuOpen,
    }));
  };

  const handleRoomClick = () => {
    setMenuData((prevState) => ({
      ...prevState,
      selectedMenu: "Quản lí phòng",
      RoomMenuOpen: !prevState.RoomMenuOpen,
    }));
  };
  return (
    <>
      <AppBar
        position="fixed"
        elevation={5}
        sx={{ backgroundColor: "#130f40" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setOpen(!open);
            }}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div" color={"white"}>
            QUẢN TRỊ HỆ THỐNG
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            backgroundColor: "#130f40",
            height: "100%",
            color: "white",
          }}
        >
          {/* User */}
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                minHeight: 60,
                justifyContent: open ? "initial" : "center",
                px: 1.5,
              }}
              onClick={handleUserClick}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SupervisedUserCircleIcon
                  sx={{
                    fontSize: open ? "40px" : "50px",
                    marginLeft: open ? "20px" : "12px",
                    color: "#f43f5e",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="User" />
              <KeyboardArrowDownIcon
                sx={{ display: !open ? "none" : "inline-block" }}
              />
            </ListItemButton>
          </ListItem>
          <Collapse in={menuData.userMenuOpen}>
            <List>
              <ListItemButton sx={{ minHeight: 60 }}>
                {open && <ChevronRightIcon />}
                <Link to="/admin/usermanagement" className={AdminStyle.link}>
                  {open ? (
                    <ListItemText primary=" Quản Lý User" />
                  ) : (
                    <TableViewIcon />
                  )}
                </Link>
              </ListItemButton>
            </List>
          </Collapse>

          {/* Location */}
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                minHeight: 60,
                justifyContent: open ? "initial" : "center",
                px: 1.5,
              }}
              onClick={handleLocationClick}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MovieFilterIcon
                  sx={{
                    fontSize: open ? "40px" : "50px",
                    marginLeft: open ? "20px" : "12px",
                    color: "#f43f5e",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Quản lí vị trí" />
              <KeyboardArrowDownIcon
                sx={{ display: !open ? "none" : "inline-block" }}
              />
            </ListItemButton>
          </ListItem>
          <Collapse in={menuData.LocationMenuOpen}>
            <List>
              {/* add Location */}
              <ListItemButton sx={{ minHeight: 60 }}>
                {open && <ChevronRightIcon />}
                <Link to="" className={AdminStyle.link}>
                  {open ? (
                    <ListItemText primary="Thêm địa điểm" />
                  ) : (
                    <AddIcon fontSize="largef" />
                  )}
                </Link>
              </ListItemButton>
              {/* managementLocation */}
              <ListItemButton sx={{ minHeight: 60 }}>
                {open && <ChevronRightIcon />}
                <Link to="" className={AdminStyle.link}>
                  {open ? (
                    <ListItemText primary="Danh sách vị trí" />
                  ) : (
                    <TableViewIcon fontSize="large" />
                  )}
                </Link>
              </ListItemButton>
            </List>
          </Collapse>

          {/* Room */}
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                minHeight: 60,
                justifyContent: open ? "initial" : "center",
                px: 1.5,
              }}
              onClick={handleRoomClick}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MovieFilterIcon
                  sx={{
                    fontSize: open ? "40px" : "50px",
                    marginLeft: open ? "20px" : "12px",
                    color: "#f43f5e",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Quản lí phòng" />
              <KeyboardArrowDownIcon
                sx={{ display: !open ? "none" : "inline-block" }}
              />
            </ListItemButton>
          </ListItem>
          <Collapse in={menuData.RoomMenuOpen}>
            <List>
              <ListItemButton sx={{ minHeight: 60 }}>
                {open && <ChevronRightIcon />}
                <Link to="/admin/listroom-Admin" className={AdminStyle.link}>
                  {open ? (
                    <ListItemText primary="Danh sách phòng" />
                  ) : (
                    <TableViewIcon fontSize="large" />
                  )}
                </Link>
              </ListItemButton>
              <ListItemButton sx={{ minHeight: 60 }}>
                {open && <ChevronRightIcon />}
                <Link to="/admin/booking" className={AdminStyle.link}>
                  {open ? (
                    <ListItemText primary="Đặt phòng" />
                  ) : (
                    <TableViewIcon fontSize="large" />
                  )}
                </Link>
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <Divider />
      </Drawer>
    </>
  );
}
