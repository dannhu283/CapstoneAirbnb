import styled from "styled-components";
export { default } from "./Locations";

export const CarouselContainer = styled.div`
  .slick-dots {
    bottom: -40px;
  }
  .slick-dots li.slick-active button:before {
    color: #f43f5e;
    font-size: 20px;
  }
  .slick-dots li button:before {
    font-size: 15px;
    transition: all 0.5s;
  }

  .slick-dots li:hover button:before {
    font-size: 20px;
    color: #f43f8e;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 80px;
  }
`;
