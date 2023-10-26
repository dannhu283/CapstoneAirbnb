import React from "react";
import { getRoomByLocation } from "../../../APIs/roomApi";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import { TenPhong, Desc } from "./index";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import IronIcon from "@mui/icons-material/Iron";
import AirplayIcon from "@mui/icons-material/Airplay";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CountertopsIcon from "@mui/icons-material/Countertops";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import PoolIcon from "@mui/icons-material/Pool";

export default function RoomItem({ placeId }) {
  const { data: listRoom, isLoading } = useQuery({
    queryKey: ["listRoom", placeId],
    queryFn: () => getRoomByLocation(placeId),
    enabled: !!placeId,
  });

  if (isLoading) return <Loading />;

  return (
    <Grid container spacing={2}>
      <Typography sx={{ fontWeight: "bold" }}>
        Có {listRoom?.length} chỗ ở phù hợp
      </Typography>
      {listRoom.map((room) => (
        <Grid item md={12} key={room.id}>
          <Card>
            <CardMedia component="img" height="140" image={room.hinhAnh} />

            <CardContent>
              <TenPhong>{room.tenPhong}</TenPhong>

              <CardActions>
                <Typography sx={{ color: "#f43f5e", fontWeight: "bold" }}>
                  {" "}
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
  );
}
