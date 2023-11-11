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
  Select,
  Box,
  FormControl,
  InputLabel,
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
import { useNavigate } from "react-router";

export default function RoomItem({ listRoom }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [sortPrice, setSortPrice] = useState(true);
  const [bedroomFilter, setBedroomFilter] = useState(null);
  const [bedFilter, setBedFilter] = useState(null);

  const navigate = useNavigate();

  let settings = ["Đỗ xe", "Hồ bơi", "Bếp"];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
  };

  const listSortRooms = () => {
    let filteredRooms = listRoom.slice();

    // Apply sorting by price
    filteredRooms.sort((a, b) => {
      if (sortPrice) {
        return a.giaTien - b.giaTien;
      } else {
        return b.giaTien - a.giaTien;
      }
    });

    // Apply filtering by number of bedrooms
    if (bedroomFilter !== null) {
      filteredRooms = filteredRooms.filter(
        (room) => room.phongNgu === bedroomFilter
      );
    }

    // Apply filtering by number of beds
    if (bedFilter !== null) {
      filteredRooms = filteredRooms.filter((room) => room.giuong === bedFilter);
    }

    return filteredRooms;
  };

  return (
    <>
      <Grid container spacing={2}>
        <Typography
          sx={{
            color: "#f43f5e",
            fontWeight: "bold",
          }}
        >
          Có {listRoom?.length} chỗ ở phù hợp
        </Typography>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                md: "30px",
                xs: "25px",
              },
              fontWeight: "bold",
              marginRight: "10px",
            }}
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
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ width: "20%" }}>
            <ButtonFill onClick={() => setSortPrice(!sortPrice)}>
              Giá tiền {sortPrice ? "▲" : "▼"}
            </ButtonFill>
          </Box>

          <Box
            sx={{
              width: "30%",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Phòng Ngủ</InputLabel>
              <Select
                sx={{ borderRadius: "20px", backgroundColor: "#f1f2f6" }}
                size="small"
                value={bedroomFilter}
                label="Phòng ngủ"
                onChange={(e) => setBedroomFilter(e.target.value)}
              >
                <MenuItem value={null}>Tất cả</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ width: "30%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Giường</InputLabel>
              <Select
                sx={{ borderRadius: "20px", backgroundColor: "#f1f2f6" }}
                size="small"
                value={bedFilter}
                label="Giường"
                onChange={(e) => setBedFilter(e.target.value)}
              >
                <MenuItem value={null}>Tất cả</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        {listSortRooms().length === 0 ? (
          <Box sx={{ margin: "5% 25% " }}>
            <img
              src="/img/animation_lo8n2ilt_small.gif"
              alt="empty"
              width={250}
            />
            <Typography variant="h5" sx={{ color: "#f43f5e" }}>
              Chưa có phòng nào
            </Typography>
          </Box>
        ) : (
          listSortRooms().map((room) => (
            <Grid item xs={12} key={room.id}>
              <Card
                onClick={() => navigate(`/roomDetail/${room.id}`)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: " rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
                  },
                }}
              >
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
                  <Typography fontWeight="bold">
                    ${room.giaTien}/ đêm
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}
