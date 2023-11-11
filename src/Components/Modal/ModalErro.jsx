import React from "react";
import { Modal, Typography } from "@mui/material";
import { ModalContent } from "../Modal";
import { ButtonCustom } from "../Button";

export default function ModalErro({ openErro, setOpenErro }) {
  return (
    <Modal
      open={openErro}
      onClose={() => {
        setOpenErro(false);
      }}
      sx={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: " rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 1000000,
      }}
    >
      <ModalContent>
        <img
          style={{ width: "120px", marginTop: "10px" }}
          src="/img/animation_error_small.gif"
          alt="errro"
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#f43f5e",
          }}
        >
          Không sửa được giá trị mặc định
        </Typography>
        <ButtonCustom
          onClick={() => {
            setOpenErro(false);
          }}
        >
          Đóng
        </ButtonCustom>
      </ModalContent>
    </Modal>
  );
}
