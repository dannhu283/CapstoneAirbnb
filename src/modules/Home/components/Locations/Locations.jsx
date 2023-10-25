import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getLocations } from "../../../../APIs/locationApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "./Location.module.scss";
import cn from "classnames/bind";
import { Link } from "react-router-dom";
const locationStyle = cn.bind(styled);

function SampleNextArrow(props) {
  const { className, style, onClick,currentSlide, slideCount } = props;
  const isSlideAtEnd = currentSlide === slideCount - 1;

  return (
    <ArrowForwardIosIcon
      className={locationStyle(className, "arrowItem")}
      style={{
        ...style,
        fontSize: "30px",
        display: "block",
        right: "-30px",
        color: isSlideAtEnd ? "gray" : "black",
        width: "25px",
        height: "25px",
        borderRadius: "50%",
        border: " 0.5px solid rgb(0 0 0/0.3)",
        paddingLeft: "5px",
        paddingRight: "2px",
      }}
      onClick={isSlideAtEnd ? null : onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { className, style, currentSlide, onClick } = props;
  const isSlideAtStart = currentSlide === 0;
  return (
    <ArrowBackIosIcon
      className={locationStyle(className, "arrowItem")}
      style={{
        ...style,
        display: isSlideAtStart ? "none" : "block",
        fontSize: "30px",
        left: "-50px",
        paddingLeft: "7px",
        width: "25px",
        height: "25px",
        borderRadius: "50%",
        border: " 0.5px solid rgb(0 0 0/0.3)",
        color: "black",
        zIndex: "9",
      }}
      onClick={onClick}
    />
  );
}

export default function Locations() {
  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className={locationStyle("location")}>
      <Container maxWidth="md">
        <Typography
          sx={{ marginBottom: "20px", fontWeight: "600" }}
          variant="h5"
        >
          Khám phá những điểm đến gần đây
        </Typography>
        <Slider {...settings}>
          {locations.data?.map((location) => (
            <div className={locationStyle("locationItem")} key={location.id}>
              <Link to={`/rooms/${location.id}`}>
                <img src={location.hinhAnh} alt="" />
              </Link>
              <div className={locationStyle("locationDetail")}>
                <Typography sx={{ fontWeight: "600", fontSize: "13px" }}>
                  {location.tinhThanh}
                </Typography>
                <Typography sx={{ fontSize: "12px", color: "#757575" }}>
                  {location.tenViTri}
                </Typography>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
}