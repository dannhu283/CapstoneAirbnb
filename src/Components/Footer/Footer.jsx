import React from "react";
import {
  Container,
  List,
  ListItem,
  Grid,
  Divider,
  Typography,
} from "@mui/material";
import { LiFooter, TitleF, Divfooter } from "./index";

export default function Footer() {
  return (
    <Divfooter>
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

          <Grid item xs={3}>
            <TitleF>CỘNG ĐỒNG </TitleF>
            <List>
              <ListItem>
                <LiFooter href="#">Sự đa dạng và cảm giác thân thuộc</LiFooter>
              </ListItem>
              <ListItem>
                <LiFooter href="#">
                  Tiện nghi phù hợp cho người khuyết tật
                </LiFooter>
              </ListItem>
              <ListItem>
                <LiFooter href="#">Đối tác liên kết Airbnb</LiFooter>
              </ListItem>
              <ListItem>
                <LiFooter href="#">Chỗ ở cho tuyến đầu</LiFooter>
              </ListItem>
              <ListItem>
                <LiFooter href="#">Lượt giới thiệu của khách</LiFooter>
              </ListItem>
              <ListItem>
                <LiFooter href="#">Airbnb.org</LiFooter>
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={3}>
            <TitleF>ĐÓN TIẾP KHÁCH</TitleF>
            <List>
              <ListItem>
                <LiFooter href="#">Cho thuê nhà</LiFooter>
              </ListItem>
              <ListItem>
                <LiFooter href="#">Tổ chức trải nghiệm trực tuyến</LiFooter>
              </ListItem>
              <ListItem>
                <LiFooter href="#">Tổ chức trải nghiệm</LiFooter>
              </ListItem>
              <ListItem>
                <LiFooter href="#">Đón tiếp khách có trách nhiệm</LiFooter>
              </ListItem>
              <ListItem>
                <LiFooter href="#">Trung tâm tài nguyên</LiFooter>
              </ListItem>
              <ListItem>
                <LiFooter href="#">Trung tâm cộng đồng</LiFooter>
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={3}>
            <TitleF>HỖ TRỢ</TitleF>
            <List>
              <ListItem>
                <LiFooter href="#">
                  Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi
                </LiFooter>
              </ListItem>
              <ListItem>
                <LiFooter href="#">Trung tâm trợ giúp</LiFooter>
              </ListItem>
              <ListItem>
                <LiFooter href="#">Các tùy chọn hủy</LiFooter>
              </ListItem>
              <ListItem>
                <LiFooter href="#">Hỗ trợ khu dân cư</LiFooter>
              </ListItem>
              <ListItem>
                <LiFooter href="#">Tin cậy và an toàn</LiFooter>
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center", margin: " 2%" }}
          >
            <Typography>© 2021 Airbnb, Inc, All rights reserved</Typography>
            <LiFooter href="#">. Quyền riêng tư</LiFooter>
            <LiFooter href="#">. Điều khoản</LiFooter>
            <LiFooter href="#">. Sơ đồ trang web</LiFooter>
          </Grid>
        </Grid>
      </Container>
    </Divfooter>
  );
}
