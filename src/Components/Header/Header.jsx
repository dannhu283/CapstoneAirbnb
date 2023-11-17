import React, { useState, useEffect } from "react";
import { getLocation } from "../../APIs/locationApi";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Toolbar,
  AppBar,
  Typography,
  Divider,
  Box,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  Stack,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { DivHeader, DivIcon, DivSetting, BoxSearch } from "./index";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import { ButtonCustom, ButtonMain } from "../Button";
import { useNavigate } from "react-router-dom";
import { ModalSuccess, ModalContent } from "../Modal";
import { useUserContext } from "../../context/UserContext/UserContext";

export default function Header() {
  const { currentUser, handleSignout } = useUserContext();

  const isAmin = currentUser?.user?.role?.toUpperCase() === "ADMIN";

  let settings = [
    "Đăng kí",
    "Đăng nhập",
    "Trợ giúp",
    "Cho thuê nhà",
    "Đăng xuất",
  ];

  if (currentUser) {
    settings = settings.filter(
      (item) => !item.includes("Đăng kí") && !item.includes("Đăng nhập")
    );
  } else {
    settings = settings.filter((item) => !item.includes("Đăng xuất"));
  }

  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showBoxSearch, setShowBoxSearch] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();

  const { data: listCityData, isLoading } = useQuery({
    queryKey: ["listCityData"],
    queryFn: () => getLocation(),
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 3) {
        // Show BoxSearch when scrolled down 100 pixels (you can adjust this value)
        setShowBoxSearch(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up the event listener
    };
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOnChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === "Đăng nhập") {
      navigate("/log-in");
      window.scrollTo(0, 0);
    } else if (setting === "Đăng kí") {
      navigate("/log-up");
      window.scrollTo(0, 0);
    } else if (setting === "Đăng xuất") {
      handleConfirmLogout();
    }
  };

  const handleOpenBoxSearch = () => {
    setShowBoxSearch(!showBoxSearch);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (selectedLocation !== "") {
      navigate(`/list-room/${selectedLocation}`);
    } else {
      setOpenAlert(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleConfirmLogout = () => {
    setShowSuccessModal(true);
  };

  const handleLogout = () => {
    handleClick();
    handleSignout();
    setShowSuccessModal(false);
  };

  const handleClickInfor = () => {
    setAnchorElUser(null);
    navigate(`/profile/${currentUser.user.id}`);
    window.scrollTo(0, 0);
  };

  if (isLoading) return <Loading />;

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item md={3} xs={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/");
                  window.scrollTo(0, 0);
                }}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6JQvbL_1Ti02W0tHPWhhiFWtDM7RoUaE5nA&usqp=CAU"
                  alt="logo"
                  width={90}
                />
                <Typography
                  variant="h6"
                  sx={{
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: " #f43f5e",
                    fontSize: "25px",
                    marginLeft: "-20px",
                  }}
                >
                  airbnb
                </Typography>
              </Box>
            </Grid>

            <Grid item md={5} xs={8} mt={3}>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <DivHeader onClick={handleOpenBoxSearch}>
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
            </Grid>

            <Grid item md={4} xs={2} mt={3}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <Typography
                    sx={{
                      color: "black",
                      cursor: "pointer",
                      fontWeight: "bold",
                      alignSelf: "center",
                      "&:hover": { color: "#f43f5e" },
                    }}
                    onClick={() => {
                      if (!currentUser) {
                        window.scrollTo(0, 0);
                        navigate("/host");
                      }
                    }}
                  >
                    {currentUser
                      ? `Xin chào, ${currentUser?.user?.name}`
                      : "Cho Thuê Chỗ Ở"}
                  </Typography>
                  <IconButton>
                    <LanguageIcon
                      fontSize="large"
                      sx={{
                        "&:hover": {
                          color: "#f43f5e",
                        },
                      }}
                    />
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
                  {isAmin && (
                    <MenuItem onClick={() => navigate("/admin")}>
                      <Typography fontWeight="bold">Admin</Typography>
                    </MenuItem>
                  )}

                  {currentUser && (
                    <Box>
                      <MenuItem onClick={handleClickInfor}>
                        <Typography fontWeight="bold">Trang cá nhân</Typography>
                      </MenuItem>

                      <Divider />
                    </Box>
                  )}

                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>

        {showBoxSearch && (
          <BoxSearch>
            <form onSubmit={handleOnSubmit}>
              <Grid container spacing={2}>
                <Grid item md={3} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Địa điểm</InputLabel>
                    <Select
                      label="Địa điểm"
                      onChange={handleOnChange}
                      value={selectedLocation}
                    >
                      <MenuItem value="">- Chọn thành phố -</MenuItem>
                      {listCityData?.map((city) => (
                        <MenuItem key={city.id} value={city.id}>
                          {city.tenViTri}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <TextField
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      label="Ngày bắt đầu"
                    />
                  </FormControl>
                </Grid>
                <Grid item md={2} xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <TextField
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      label="Ngày kết thúc"
                    />
                  </FormControl>
                </Grid>
                <Grid item md={2} xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <TextField type="number" label="Số khách" />
                  </FormControl>
                </Grid>
                <Grid item md={2} xs={12}>
                  <ButtonCustom type="submit">Tìm kiếm</ButtonCustom>
                </Grid>
              </Grid>
            </form>
          </BoxSearch>
        )}
      </Container>
      {showSuccessModal && (
        <ModalSuccess>
          <ModalContent>
            <img
              style={{ width: "120px", marginTop: "10px" }}
              src="/img/animation_lnov06bj_small.gif"
              alt="confirm"
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: "40px",
                color: " #f43f5e",
              }}
            >
              Bạn có chắc chắn đăng xuất?
            </Typography>

            <ButtonMain onClick={handleLogout}>Đồng ý</ButtonMain>
            <ButtonCustom onClick={() => setShowSuccessModal(false)}>
              Hủy Bỏ
            </ButtonCustom>
          </ModalContent>
        </ModalSuccess>
      )}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Đăng xuất thành công!
          </Alert>
        </Snackbar>
      </Stack>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            severity="error"
            onClose={handleCloseAlert}
            sx={{ width: "100%" }}
          >
            Vui lòng chọn địa điểm muốn đến
          </Alert>
        </Snackbar>
      </Stack>
    </AppBar>
  );
}
