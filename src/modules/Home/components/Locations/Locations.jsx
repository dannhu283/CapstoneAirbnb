import React, { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getLocation } from "../../../../APIs/locationApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "./Location.module.scss";
import cn from "classnames/bind";
import { Link } from "react-router-dom";
import { CarouselContainer } from "./index";

const locationStyle = cn.bind(styled);

export default function Locations() {
  const [dotsCount, setDotsCount] = useState(4);

  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocation,
  });

  const handleDotsCount = (count) => {
    setDotsCount(count);
  };

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <CarouselContainer>
      <div className={locationStyle("location")}>
        <Container>
          <Typography
            sx={{ marginBottom: "20px", fontWeight: "600" }}
            variant="h5"
          >
            Khám phá những điểm đến gần đây
          </Typography>
          <Slider
            {...settings}
            appendDots={(dots) => (
              <div>
                {dots.slice(0, dotsCount)}
                {dots.length > dotsCount && (
                  <h2
                    className={locationStyle("dots")}
                    onClick={() => handleDotsCount(dots.length)}
                  >
                    ...
                  </h2>
                )}
              </div>
            )}
          >
            {locations.map((location) => (
              <div className={locationStyle("locationItem")} key={location.id}>
                <Link to={`/list-room/${location.id}`}>
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
    </CarouselContainer>
  );
}
