import React from "react";
import { useNavigate } from "react-router-dom";
import { BackGround } from "./index";
import { ButtonCustom } from "../Button";

export default function Acsess() {
  const nagigate = useNavigate();

  return (
    <BackGround>
      <ButtonCustom
        style={{ position: "absolute", bottom: "10%", left: "41%" }}
        onClick={() => nagigate("/")}
      >
        Đăng nhập bằng tài khoản admin
      </ButtonCustom>
    </BackGround>
  );
}
