import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import style from "./HeaderFooter.module.scss";
export default function HeaderFooter() {
  return (
    <div className={style.headerFooter}>
      <Container>
        <Typography
          sx={{ fontWeight: "bold", marginBottom: "20px" }}
          variant="h5"
        >
          Ở bất cứ đâu
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className={style.headerFooterItem}>
              <img
                src="https://a0.muscache.com/im/pictures/298b88b8-042b-4fe4-91dc-db8a29840759.jpg?im_w=720"
                alt=""
                className={style.imgFooter}
              />
              <p className={style.title}>Toàn bộ nhà</p>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={style.headerFooterItem}>
              <img
                src="https://a0.muscache.com/im/pictures/miso/Hosting-618869107520371080/original/7fc1a193-f142-4010-a302-d9112344ff04.jpeg?im_w=720"
                alt=""
                className={style.imgFooter}
              />
              <p className={style.title}>Chỗ ở độc đáo</p>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={style.headerFooterItem}>
              <img
                src="https://a0.muscache.com/im/pictures/miso/Hosting-46890950/original/a4d94380-466b-455f-af2c-0e3d816b5bc5.jpeg?im_w=720"
                alt=""
                className={style.imgFooter}
              />
              <p className={style.title}>Chỗ ở thiên nhiên</p>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={style.headerFooterItem}>
              <img
                src="https://a0.muscache.com/im/pictures/df9c73e6-c3e7-48d0-9aa8-1d432bdfff1d.jpg?im_w=960"
                alt=""
                className={style.imgFooter}
              />
              <p className={style.title}>Cho phép nuôi thú cưng</p>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
