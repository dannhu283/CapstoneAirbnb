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
    background-color: #ff9f1a;
    border: 2px dashed #ff9f1a;
  }
`;

export const ButtonCustom = styled.button`
  background-color: #ffcccc;
  padding: 10px 15px;
  border: 2px solid #ffcccc;
  border-radius: 7px;
  cursor: pointer;
  margin: 10px;
  font-size: 15px;
  &:hover {
    color: #ff3838;
    font-weight: bold;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  }
`;
