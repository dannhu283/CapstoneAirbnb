import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import cn from "classnames/bind";
import bannerStyle from "./Banner.module.scss";
const bannerItemStyle = cn.bind(bannerStyle);

function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <ArrowForwardIosIcon
      className={bannerItemStyle(className, "arrowItem")}
      style={{
        ...style,
        fontSize: "30px",
        display: "block",
        right: "20px",
        color: "#fff",
      }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowBackIosIcon
      className={bannerItemStyle(className, "arrowItem")}
      style={{
        ...style,
        display: "block",
        fontSize: "30px",
        left: "20px",
        color: "#fff",
        zIndex: "9",
      }}
      onClick={onClick}
    />
  );
}

export default function Carousel() {
  const sliderRef = React.useRef(null);
  const banners = [
    <img
      src="/img/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.webp"
      alt="#"
      className={bannerStyle.bannerImg}
    />,
    <img
      src="/img/what-is-airbnb-thumbnail.jpg"
      alt=""
      className={bannerStyle.bannerImg}
    />,
  ];
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplaySpeed: 4000,
    autoplay: true,
  };
  return (
    <>
      <Slider ref={sliderRef} {...settings}>
        {banners.map((banner, index) => {
          return (
            <div key={index} className={bannerStyle.bannerItem}>
              {banner}
            </div>
          );
        })}
      </Slider>
    </>
  );
}
