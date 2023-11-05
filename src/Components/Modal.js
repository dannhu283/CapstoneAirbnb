import styled from "@emotion/styled";

export const ModalSuccess = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 12;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  width: 400px;
  /* height: 280px; */
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

export const ModalWidth = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 50%;
  background-color: white;
  border: none solid #fff;
  padding: 30px;
`;
