import styled from "styled-components";

export { default } from "./LogUp";

export const BackGround = styled.div`
  background-image: url("/img/65045f093c166fdddb4a94a5_x-65045f0266217.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
`;
