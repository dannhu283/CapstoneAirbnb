import styled from "@emotion/styled";

export const ButtonMain = styled.button`
  margin: ${(props) => props.m};
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 8px;
  border: 2px solid #3ae374;
  background-color: #3ae374;
  color: #3d3d3d;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #f43f5e;
    border: 2px dashed #f43f5e;
  }
`;

export const ButtonCustom = styled.button`
  color: white;
  background-color: #f43f5e;
  padding: 10px 15px;
  border: 2px solid #f43f5e;
  border-radius: 7px;
  cursor: pointer;
  margin: 10px;
  font-size: 15px;
  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    color: black;
  }
`;

export const ButtonFill = styled.button`
  width: 100%;
  background-color: #f1f2f6;
  padding: 10px;
  border-radius: 20px;
  border: 2px solid #ced6e0;
  cursor: pointer;
  &:hover {
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    background-color: #ced6e0;
  }
`;
