import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DrawerAdmin from "../AdminComponents/DrawlerAdmin";
import { Typography } from "@mui/material";
import { ButtonMain, ButtonCustom } from "../../Components/Button";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminPath = location.pathname === "/admin";
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <DrawerAdmin />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {isAdminPath && (
            <Box>
              <img
                src="/img/Welcome GIF - Welcome - Discover & Share GIFs.gif"
                alt="hello"
                style={{
                  marginLeft: "33%",
                }}
              />
              <Typography
                sx={{ color: "#130f40", fontSize: "35px", textAlign: "center" }}
              >
                Chào Mừng Bạn Quay Trở Lại Hệ Thống
              </Typography>
              <Box sx={{ margin: "5% 0 0 40%" }}>
                <ButtonMain
                  style={{ marginRight: "20px" }}
                  onClick={() => navigate("")}
                >
                  Quản lí người dùng
                </ButtonMain>
                <ButtonCustom onClick={() => navigate("")}>
                  Quản lí phòng
                </ButtonCustom>
              </Box>
            </Box>
          )}
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
