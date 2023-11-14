import React from "react";
import { TenPhong } from "../../../ListRoom/RoomItem";

import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import IronIcon from "@mui/icons-material/Iron";
import AirplayIcon from "@mui/icons-material/Airplay";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CountertopsIcon from "@mui/icons-material/Countertops";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import PoolIcon from "@mui/icons-material/Pool";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  CardMedia,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getRoomDetail } from "../../../../APIs/roomApi";
import dayjs from "dayjs";
export default function History({ roomId, startDay, endDay }) {
  const { data: room = {} } = useQuery({
    queryKey: ["room", roomId],
    queryFn: () => getRoomDetail(roomId),
  });

  const startDate = dayjs(startDay).format("DD/MM/YYYY");
  const endDate = dayjs(endDay).format("DD/MM/YYYY");
  return (
    <div>
      <Grid item xs={12} key={room.id}>
        <Card>
          <CardMedia component="img" height="140" image={room.hinhAnh} />
          <CardContent>
            <TenPhong>{room.tenPhong}</TenPhong>
            <Typography sx={{ fontSize: "14px", marginTop: "10px" }}>
              {room.phongNgu} Phòng ngủ - {room.giuong} Giường -{room.phongTam}{" "}
              Phòng tắm
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

            <Box
              sx={{
                padding: "20px 0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography fontWeight="bold">${room.giaTien}/ đêm</Typography>
              <Typography fontWeight="bold">
                Ngày Đến: <i>{startDate}</i> - Ngày đi: <i>{endDate}</i>{" "}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Divider
        sx={{ margin: "10px 0", backgroundColor: "#f43f5e", height: "2px" }}
      />
    </div>
  );
}
