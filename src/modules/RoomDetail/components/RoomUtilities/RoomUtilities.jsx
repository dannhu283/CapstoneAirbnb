import React from "react";
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined";
import styled from "./RoomUtilities.module.scss";
import { Button, Grid, Tooltip, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import IronIcon from "@mui/icons-material/Iron";
import AirplayIcon from "@mui/icons-material/Airplay";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CountertopsIcon from "@mui/icons-material/Countertops";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import PoolIcon from "@mui/icons-material/Pool";
import WhereToVoteOutlinedIcon from "@mui/icons-material/WhereToVoteOutlined";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
export default function RoomUtilities({ roomDetail }) {
  if (!roomDetail) {
    return null;
  }
  const text = roomDetail.moTa;
  const words = text?.split("\r\n");
  const host = words?.find((word) => {
    return word.includes("Chủ nhà siêu cấp");
  });
  const decsHost = words?.find((word) => {
    return word.includes("đánh giá cao");
  });
  return (
    <div className={styled.roomUtilities}>
      <div className={styled.heading}>
        <h3 className={styled.title}>Toàn bộ căn hộ. {host && host}</h3>
        <div>
          <span>Khách {roomDetail.khach} · </span>
          <span>Phòng ngủ {roomDetail.phongNgu} · </span>
          <span>Giường {roomDetail.giuong} · </span>
          <span>Phòng tắm {roomDetail.phongTam} </span>
        </div>
      </div>
      <div className={styled.detailDesc}>
        <div className={styled.descItem}>
          <p>
            <PersonPinCircleOutlinedIcon
              color="action"
              sx={{ marginTop: "3px", fontSize: "40px", marginRight: "15px" }}
            />{" "}
          </p>
          <div className={styled.descRight}>
            <Typography
              sx={{ fontWeight: "600", fontSize: "16px" }}
              variant="h6"
            >
              {host}
            </Typography>
            <Typography sx={{ color: "rgb(113, 113, 113)", fontSize: "15px" }}>
              {decsHost}
            </Typography>
          </div>
        </div>
        <div className={styled.descItem}>
          <p>
            <WhereToVoteOutlinedIcon
              color="success"
              sx={{ marginTop: "3px", fontSize: "40px", marginRight: "15px" }}
            />{" "}
          </p>
          <div className={styled.descRight}>
            <Typography
              sx={{ fontWeight: "600", fontSize: "16px" }}
              variant="h6"
            >
              Địa điểm tuyệt vời
            </Typography>
            <Typography sx={{ color: "rgb(113, 113, 113)", fontSize: "15px" }}>
              90% khách gần đây đã xếp hạng 5 sao cho vị trí này.
            </Typography>
          </div>
        </div>
        <div className={styled.descItem}>
          <p>
            <CalendarMonthTwoToneIcon
              color="primary"
              sx={{ marginTop: "3px", fontSize: "40px", marginRight: "15px" }}
            />{" "}
          </p>
          <div className={styled.descRight}>
            <Typography
              sx={{ fontWeight: "600", fontSize: "16px" }}
              variant="h6"
            >
              Huỷ miễn phí trong 48 giờ
            </Typography>
          </div>
        </div>
      </div>
      <div className={styled.utilities}>
        <Typography
          sx={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}
        >
          Nơi này có những gì cho bạn
        </Typography>
        <Grid container maxWidth={500}>
          {roomDetail.mayGiat ? (
            <Grid
              item
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row-reverse",
                justifyContent: "flex-end",
                marginBottom: "5px",
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: "300" }}>
                Máy Giặt
              </Typography>
              <Tooltip title="Máy giặt" placement="top">
                <IconButton
                  sx={{ paddingLeft: "0", "&:hover": { color: "#f43f5e" } }}
                >
                  <LocalLaundryServiceIcon sx={{ fontSize: "35px" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          ) : (
            ""
          )}
          {roomDetail.banLa ? (
            <Grid
              item
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row-reverse",
                justifyContent: "flex-end",
                marginBottom: "5px",
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: "300" }}>
                Bàn là
              </Typography>
              <Tooltip title="Bàn là" placement="top">
                <IconButton
                  sx={{ paddingLeft: "0", "&:hover": { color: "#f43f5e" } }}
                >
                  <IronIcon sx={{ fontSize: "35px" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          ) : (
            ""
          )}
          {roomDetail.hoBoi ? (
            <Grid
              item
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row-reverse",
                justifyContent: "flex-end",
                marginBottom: "5px",
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: "300" }}>
                Hồ bơi
              </Typography>
              <Tooltip title="Hồ bơi" placement="top">
                <IconButton
                  sx={{ paddingLeft: "0", "&:hover": { color: "#f43f5e" } }}
                >
                  <PoolIcon sx={{ fontSize: "35px" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          ) : (
            ""
          )}
          {roomDetail.tivi ? (
            <Grid
              item
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row-reverse",
                justifyContent: "flex-end",
                marginBottom: "10px",
              }}
            >
              <Typography
                sx={{ paddingLeft: "0", fontSize: "16px", fontWeight: "300" }}
              >
                Ti Vi
              </Typography>
              <Tooltip title="Ti Vi" placement="top">
                <IconButton
                  sx={{ paddingLeft: "0", "&:hover": { color: "#f43f5e" } }}
                >
                  <AirplayIcon sx={{ fontSize: "35px" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          ) : (
            ""
          )}
          {roomDetail.dieuHoa ? (
            <Grid
              item
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row-reverse",
                justifyContent: "flex-end",
                marginBottom: "5px",
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: "300" }}>
                Điều hòa
              </Typography>
              <Tooltip title="Điều hòa" placement="top">
                <IconButton
                  sx={{ paddingLeft: "0", "&:hover": { color: "#f43f5e" } }}
                >
                  <AcUnitIcon sx={{ fontSize: "35px" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          ) : (
            ""
          )}
          {roomDetail.bep ? (
            <Grid
              item
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row-reverse",
                justifyContent: "flex-end",
                marginBottom: "5px",
              }}
            >
              <Typography
                sx={{ paddingLeft: "0", fontSize: "16px", fontWeight: "300" }}
              >
                Bếp
              </Typography>
              <Tooltip title="Bếp" placement="top">
                <IconButton sx={{ "&:hover": { color: "#f43f5e" } }}>
                  <CountertopsIcon sx={{ fontSize: "35px" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          ) : (
            ""
          )}
          {roomDetail.doXe ? (
            <Grid
              item
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row-reverse",
                justifyContent: "flex-end",
                marginBottom: "5px",
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: "300" }}>
                Bãi đỗ xe
              </Typography>
              <Tooltip title="Bãi đỗ xe" placement="top">
                <IconButton
                  sx={{ paddingLeft: "0", "&:hover": { color: "#f43f5e" } }}
                >
                  <LocalParkingIcon sx={{ fontSize: "35px" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
        <Button
          sx={{ margin: "20px 0", fontWeight: "500", fontSize: "16px" }}
          variant="outlined"
        >
          Hiển thị tất cả 75 tiện nghi
        </Button>
      </div>
    </div>
  );
}
