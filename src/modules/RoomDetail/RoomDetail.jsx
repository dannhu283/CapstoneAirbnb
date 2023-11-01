import React, { useState } from "react";
import roomDetailStyle from "./RoomDetail.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getRoomDetail } from "../../APIs/roomApi";
import { useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";
import { getLocationById } from "../../APIs/locationApi";
import cn from 'classnames/bind'
import RoomUtilities from "./components/RoomUtilities";
import BookingRoom from "./components/BookingRoom";
import Rating from "./components/Rating";
import Feedback from "./components/Feedback/Feedback";
const styled = cn.bind(roomDetailStyle)
export default function RoomDetail() {
  const [comments,setComments] = useState([])
  const { roomId } = useParams();
  const { data: roomDetail = {} } = useQuery({
    queryKey: ["roomDetail"],
    queryFn: () => getRoomDetail(roomId),
    enabled: !!roomId,
  });
  
  const { data: locationDetail = {} } = useQuery({
    queryKey: ["locationDetail"],
    queryFn: () => getLocationById(roomId),
    enabled: !!roomId,
  });
  // Lấy giá tiền 
  const price = roomDetail?.giaTien
  // Lấy số lượng feedbacks
  const handleGetFeedback = (feedbacks)=>{
    setComments(feedbacks)
  }
  // Counts Star
  const ratingStar = comments.reduce((result, review) => {
    const totalStar = result + review.saoBinhLuan;
    return totalStar;
  }, 0);
  const totalReviews = comments.length;
  // Trung bình đánh giá
  const averageRating = (ratingStar / totalReviews).toFixed(1);

  return (
    <div className={styled("roomDetail")}>
      <Container>
        <div className={styled("roomItem")}>
          <div className={styled("roomHeading")}>
            <p className={styled("roomName")}>{roomDetail.tenPhong}</p>
            <div className={styled("locationDetail")}>
              <p className={styled("rateItem","locationFlex")}>
                <StarIcon sx={{ marginRight: "3px", fontSize: "17px" }} /> {totalReviews === 0 ? 0 :averageRating } ·
                <span>{totalReviews} đánh giá</span>
              </p>
              <p className={styled("locationIcon","locationFlex")}>
                ·
                <PersonIcon sx={{ marginRight: "5px", marginLeft: "5px" }} />
                Chủ nhà siêu cấp
              </p>
              <p className={styled("locationName","locationFlex")}>·
                <span>{locationDetail.tenViTri}, {locationDetail.tinhThanh}</span>
              </p>
            </div>
          </div>
          <img src={roomDetail.hinhAnh} alt="" />
        </div>
        <Grid container>
          <Grid item md={8}>
            <RoomUtilities roomDetail={roomDetail}/>
          </Grid>
          <Grid item md={4}>
            <BookingRoom roomId={roomId} price={price} averageRating={totalReviews === 0 ? 0 :averageRating } totalReviews={totalReviews}   />
          </Grid>
        </Grid>
        <Rating averageRating={totalReviews === 0 ? 0 :averageRating } totalReviews={totalReviews} />
        <Feedback onGetFeedbacks={handleGetFeedback} roomId={roomId}/>
      </Container>
    </div>
  );
}
