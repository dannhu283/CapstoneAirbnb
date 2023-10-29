import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarRating from "@mui/material/Rating";
import styled from "./Rating.module.scss";


export default function Rating() {
  return (
    <div className={styled.rating}>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          fontWeight: "500",
          fontSize: "23px",
          marginBottom: "20px",
        }}
      >
        <StarIcon sx={{ fontSize: "25px", marginRight: "5px" }} />
        4,0 ·<span>25 đánh giá</span>
      </Typography>
      <Grid container spacing={3}>
        <Grid md={6} item>
          <div className={styled.ratingItem}>
            <Typography>Mức độ sạch sẽ</Typography>
            <Box
              sx={{
                width: 200,
                display: "flex",
              }}
            >
              <StarRating
                name="text-feedback"
                value={5}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
            </Box>
          </div>
          <div className={styled.ratingItem}>
            <Typography>Nhận Phòng</Typography>
            <Box
              sx={{
                width: 200,
                display: "flex",
              }}
            >
              <StarRating
                name="text-feedback"
                value={5}
                readOnly
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
            </Box>
          </div>
          <div className={styled.ratingItem}>
            <Typography>Giao Tiếp</Typography>
            <Box
              sx={{
                width: 200,
                display: "flex",
              }}
            >
              <StarRating
                name="text-feedback"
                value={5}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
            </Box>
          </div>
        </Grid>
        <Grid md={6} item>
          <div className={styled.ratingItem}>
            <Typography>Độ chính xác</Typography>
            <Box
              sx={{
                width: 200,
                display: "flex",
              }}
            >
              <StarRating
                name="text-feedback"
                value={3}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
            </Box>
          </div>
          <div className={styled.ratingItem}>
            <Typography>Vị trí</Typography>
            <Box
              sx={{
                width: 200,
                display: "flex",
              }}
            >
              <StarRating
                name="text-feedback"
                value={3}
                readOnly
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
            </Box>
          </div>
          <div className={styled.ratingItem}>
            <Typography>Giá trị</Typography>
            <Box
              sx={{
                width: 200,
                display: "flex",
              }}
            >
              <StarRating
                name="text-feedback"
                value={4}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
            </Box>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
