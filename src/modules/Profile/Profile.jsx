import React from "react";
import { Box, Container, Grid } from "@mui/material";
import { TitleProfile } from "./index";

export default function Profile() {
  return (
    <Container>
      <Box height={200} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitleProfile>THÔNG TIN NGƯỜI DÙNG</TitleProfile>
        </Grid>

        <Grid item xs={4}></Grid>
      </Grid>
    </Container>
  );
}
