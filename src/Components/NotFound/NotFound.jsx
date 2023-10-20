import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BackGround } from "./index";

export default function NotFound() {
  const nagigate = useNavigate();

  return (
    <BackGround>
      <Button
        sx={{
          color: "primary",
          position: "absolute",
          bottom: "10%",
          left: "47%",
          "&:hover": {
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
            color: "#ff9f1a",
            fontWeight: "bold",
          },
        }}
        variant="contained"
        onClick={() => nagigate("/")}
      >
        Về Trang chủ
      </Button>
    </BackGround>
  );
}
