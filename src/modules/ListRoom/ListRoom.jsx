import React from "react";
import { Box, Container, Grid } from "@mui/material";
import RoomItem from "./RoomItem";
import RoomMap from "./RoomMap";
import { useParams } from "react-router-dom";

export default function ListRoom() {
  const { placeId } = useParams();
  return (
    <>
      <Box height={200} />
      <Container>
        <Grid container spacing={2}>
          <Grid item md={8}>
            <RoomItem placeId={placeId} />
          </Grid>
          <Grid item md={4}>
            <RoomMap />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
