import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Tooltip,
  Button,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { TenPhong, Desc } from "./index";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import IronIcon from "@mui/icons-material/Iron";
import AirplayIcon from "@mui/icons-material/Airplay";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CountertopsIcon from "@mui/icons-material/Countertops";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PoolIcon from "@mui/icons-material/Pool";
import { ButtonFill } from "../../../Components/Button";

export default function RoomItem({ listRoom }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [sortPrice, setSortPrice] = useState(true);

  let settings = ["Đỗ xe", "Hồ bơi", "Bếp"];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
  };

  const sortRoomsByPrice = () => {
    return listRoom.slice().sort((a, b) => {
      if (sortPrice) {
        return a.giaTien - b.giaTien;
      } else {
        return b.giaTien - a.giaTien;
      }
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Typography>Có {listRoom?.length} chỗ ở phù hợp</Typography>
        <Grid
          item
          md={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ fontSize: "30px", fontWeight: "bold", marginRight: "10px" }}
          >
            Chỗ ở tại khu vực bản đồ đã chọn
          </Typography>
          <Button
            sx={{ color: "black", backgroundColor: "#dfe4ea" }}
            onClick={handleOpenUserMenu}
          >
            <FilterAltIcon sx={{ color: "#f43f5e" }} />
            Bộ lọc
          </Button>
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
              <MenuItem
                key={setting}
                onClick={() => handleCloseUserMenu(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
                <Divider />
              </MenuItem>
            ))}
          </Menu>
        </Grid>
        <Grid item md={12}>
          <ButtonFill onClick={() => setSortPrice(!sortPrice)}>
            Giá tiền {sortPrice ? "▲" : "▼"}
          </ButtonFill>
          <ButtonFill style={{ margin: "0 10px" }}>Phòng ngủ</ButtonFill>
          <ButtonFill>Giường</ButtonFill>
        </Grid>
        {sortRoomsByPrice().map((room) => (
          <Grid item md={12} key={room.id}>
            <Card>
              <CardMedia component="img" height="140" image={room.hinhAnh} />

              <CardContent>
                <TenPhong>{room.tenPhong}</TenPhong>
                <Typography sx={{ fontSize: "14px", marginTop: "10px" }}>
                  {room.phongNgu} Phòng ngủ - {room.giuong} Giường -
                  {room.phongTam} Phòng tắm
                </Typography>

                <CardActions>
                  <Typography sx={{ color: "#f43f5e", fontWeight: "bold" }}>
                    Tiện ích :
                  </Typography>

                  {room.mayGiat ? (
                    <Tooltip title="Máy giặt" placement="top">
                      <IconButton sx={{ "&:hover": { color: "#f43f5e" } }}>
                        <LocalLaundryServiceIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    ""
                  )}

                  {room.banLa ? (
                    <Tooltip title="Bàn là" placement="top">
                      <IconButton sx={{ "&:hover": { color: "#f43f5e" } }}>
                        <IronIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    ""
                  )}

                  {room.tivi ? (
                    <Tooltip title="Ti Vi" placement="top">
                      <IconButton sx={{ "&:hover": { color: "#f43f5e" } }}>
                        <AirplayIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    ""
                  )}

                  {room.dieuHoa ? (
                    <Tooltip title="Điều hòa" placement="top">
                      <IconButton sx={{ "&:hover": { color: "#f43f5e" } }}>
                        <AcUnitIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    ""
                  )}

                  {room.bep ? (
                    <Tooltip title="Bếp" placement="top">
                      <IconButton sx={{ "&:hover": { color: "#f43f5e" } }}>
                        <CountertopsIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    ""
                  )}

                  {room.doXe ? (
                    <Tooltip title="Bãi đỗ xe" placement="top">
                      <IconButton sx={{ "&:hover": { color: "#f43f5e" } }}>
                        <LocalParkingIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    ""
                  )}

                  {room.hoBoi ? (
                    <Tooltip title="Hồ bơi" placement="top">
                      <IconButton sx={{ "&:hover": { color: "#f43f5e" } }}>
                        <PoolIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    ""
                  )}
                </CardActions>

                <Desc>{room.moTa}</Desc>
                <Typography fontWeight="bold">${room.giaTien}/ đêm</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
