import React from "react";
import { Container, List, ListItem, Grid } from "@mui/material";
import { LiFooter, TitleF } from "./index";

export default function Footer() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TitleF>Giới thiệu</TitleF>
          <List>
            <ListItem>
              <LiFooter href="#">Phương thức hoạt động của Airbnb</LiFooter>
            </ListItem>
            <ListItem>
              <LiFooter href="#">Trang tin tức</LiFooter>
            </ListItem>
            <ListItem>
              <LiFooter href="#">Nhà đầu tư</LiFooter>
            </ListItem>
            <ListItem>
              <LiFooter href="#">Airbnb Plus</LiFooter>
            </ListItem>
            <ListItem>
              <LiFooter href="#">Airbnb Luxe</LiFooter>
            </ListItem>
            <ListItem>
              <LiFooter href="#">HotelTonight</LiFooter>
            </ListItem>
            <ListItem>
              <LiFooter href="#">Airbnb for Work</LiFooter>
            </ListItem>
            <ListItem>
              <LiFooter href="#">Nhờ có Host, mọi điều đều có thể</LiFooter>
            </ListItem>
            <ListItem>
              <LiFooter href="#">Cơ hội nghề nghiệp</LiFooter>
            </ListItem>
            <ListItem>
              <LiFooter href="#">Thư của nhà sáng lập</LiFooter>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}
