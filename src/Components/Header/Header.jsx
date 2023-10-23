import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import {
  Typography,
  Divider,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { DivHeader, DivIcon, DivSetting } from "./index";

const settings = [
  "Đăng kí",
  "Đăng nhập",
  "Cho thuê nhà",
  "Tổ chức trải nghiệm",
  "Trợ giúp",
];

export default function Header() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <img src="img/images.png" alt="logo" width={100} />
          <Typography
            variant="h6"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: " #f43f5e",
            }}
          >
            airbnb
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", margin: "0 20%" }}>
            <DivHeader>
              <Typography sx={{ marginX: "10px" }}>Địa điểm </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography sx={{ marginX: "10px" }}>Thời gian</Typography>
              <Divider orientation="vertical" flexItem />
              <Typography sx={{ marginX: "10px" }}>Thêm khách</Typography>
              <DivIcon>
                <SearchIcon fontSize="small" sx={{ marginLeft: "5px" }} />
              </DivIcon>
            </DivHeader>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Typography
                sx={{
                  color: "black",
                  cursor: "pointer",
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                Cho thuê chỗ ở qua Airbnb
              </Typography>
              <IconButton>
                <LanguageIcon fontSize="large" />
              </IconButton>
            </Box>

            <DivSetting>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MenuIcon />
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </DivSetting>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
