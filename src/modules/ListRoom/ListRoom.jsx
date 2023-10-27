import React from "react";
import { getRoomByLocation } from "../../APIs/roomApi";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import { Box, Container, Grid, Typography } from "@mui/material";
import RoomItem from "./RoomItem";
import RoomMap from "./RoomMap";
import { useParams } from "react-router-dom";

export default function ListRoom() {
  const { placeId } = useParams();

  const { data: listRoom, isLoading } = useQuery({
    queryKey: ["listRoom", placeId],
    queryFn: () => getRoomByLocation(placeId),
    enabled: !!placeId,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <Box height={200} />
      <Container>
        {listRoom?.length === 0 ? (
          <Box sx={{ margin: "5% 35% " }}>
            <img
              src="/img/animation_lo8n2ilt_small.gif"
              alt="empty"
              width={250}
            />
            <Typography variant="h5" sx={{ color: "#f43f5e" }}>
              Chưa có phòng ở khu vực này
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid item md={7}>
              <RoomItem listRoom={listRoom} />
            </Grid>
            <Grid item md={5}>
              <RoomMap />
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
