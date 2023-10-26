import styled from "styled-components";

export { default } from "./Header";

export const linkHeader = styled.a`
  text-decoration: none;
  color: black;
`;

export const DivHeader = styled.div`
  background-color: #ffffff;
  color: black;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  padding: 10px;
  border-radius: 50px;
  cursor: pointer;
`;

export const DivIcon = styled.div`
  color: white;
  background-color: #f43f5e;
  width: 30px;
  height: 30px;
  line-height: 35px;
  border-radius: 50%;
  @media (max-width: 978px) {
    display: none;
  }
`;

export const DivSetting = styled.div`
  border: 1px solid #dfe4ea;
  border-radius: 25px;
  padding: 5px 10px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
  }
`;

export const BoxSearch = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  margin: 15px 15%;
  border-radius: 40px;
  padding: 12px;
`;
