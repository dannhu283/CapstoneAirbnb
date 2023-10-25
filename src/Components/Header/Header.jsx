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

  const isUser = currentUser?.user.role.toLowerCase() === "user";

  let settings = [
    "Đăng kí",
    "Đăng nhập",
    "Trợ giúp",
    "Cho thuê nhà",
    "Tổ chức trải nghiệm",
    "Đăng xuất",
  ];

  if (isUser) {
    settings = settings.filter(
      (item) => !item.includes("Đăng kí") && !item.includes("Đăng nhập")
    );
  } else {
    settings = settings.filter((item) => !item.includes("Đăng xuất"));
  }

  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [state, setState] = useState({
    id: "",
  });
  const [showBoxSearch, setShowBoxSearch] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();

  const { data: listCityData, isLoading } = useQuery({
    queryKey: ["listCityData"],
    queryFn: () => getLocation(),
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        // Show BoxSearch when scrolled down 100 pixels (you can adjust this value)
        setShowBoxSearch(false);
      } else {
        setShowBoxSearch(true);
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOnChange = (e) => {
    setState({
      id: e.target.value,
    });
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === "Đăng nhập") {
      navigate("/log-in");
    } else if (setting === "Đăng kí") {
      navigate("/log-up");
    } else if (setting === "Đăng xuất") {
      handleConfirmLogout();
    }
  };

  const handleOpenBoxSearch = () => {
    setShowBoxSearch(!showBoxSearch);
  };

  if (isLoading) return <Loading />;

  const handleOnSubmit = (e) => {
    // if (state.id !== "") {
    //   navigate(`/roombycity/${state.id}`);
    // }
  };

  const handleConfirmLogout = () => {
    setShowSuccessModal(true);
  };

  const handleLogout = () => {
    handleClick();
    handleSignout();
    setShowSuccessModal(false);
  };

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
            <Grid item xs={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src="img/images.png" alt="logo" width={100} />
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

            <Grid item xs={5} mt={3}>
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

            <Grid item xs={4} mt={3}>
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
                    Đón tiếp khách
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
                  {isUser && (
                    <Box>
                      <MenuItem>
                        <Typography fontWeight="bold">Trang cá nhân</Typography>
                      </MenuItem>
                      <MenuItem>
                        <Typography fontWeight="bold">Chuyến đi</Typography>
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
                      defaultValue=""
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
    </AppBar>
  );
}
