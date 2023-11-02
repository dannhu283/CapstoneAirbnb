import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Container,
  Grid,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import ReplyIcon from "@mui/icons-material/Reply";
import { logup } from "../../../APIs/userApi";
import { BackGround, Overlay } from "./index";
import { ButtonCustom, ButtonMain } from "../../../Components/Button";
import { ModalSuccess, ModalContent } from "../../../Components/Modal";

//yup validation
const signupShema = object({
  name: string().required("Tên không được để trống"),
  email: string()
    .required("email không được để trống")
    .email("email không đúng định dạng"),
  password: string()
    .required("Mật khấu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
    ),
  phone: string().required("Vui lòng nhập số điện thoại"),
  birthday: string().required("Ngày sinh không được để trống"),
});

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      birthday: "",
    },
    resolver: yupResolver(signupShema),
    mode: "onTouched",
  });

  const {
    mutate: handleSignup,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => logup(payload),
    onSuccess: () => {
      setShowSuccessModal(true);
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values) => {
    //call API sign up
    handleSignup(values);
  };

  return (
    <Box position={"relative"}>
      <BackGround></BackGround>
      <Overlay>
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={3}
            sx={{
              position: "relative",
              marginTop: "15%",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ReplyIcon
              onClick={() => navigate("/")}
              sx={{
                position: "absolute",
                left: "5%",
                color: " #f43f5e",
                cursor: "pointer",
                fontSize: "30px",
                "&:hover": { color: "#2ed573" },
              }}
            />
            <Typography
              variant="h5"
              sx={{ color: "#f43f5e", fontWeight: "bold" }}
            >
              Đăng Kí
            </Typography>

            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: "100%", marginTop: "20px" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Họ Tên"
                    color="success"
                    variant="outlined"
                    fullWidth
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name && errors.name.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    color="success"
                    variant="outlined"
                    fullWidth
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email && errors.email.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Mật khẩu"
                    color="success"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password && errors.password.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Số Điện Thoại"
                    color="success"
                    variant="outlined"
                    fullWidth
                    {...register("phone")}
                    error={!!errors.phone}
                    helperText={errors.phone && errors.phone.message}
                  />
                  {error && <Typography color="red">{error}</Typography>}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    type="date"
                    color="success"
                    variant="outlined"
                    fullWidth
                    {...register("birthday")}
                    error={!!errors.birthday}
                    helperText={errors.birthday && errors.birthday.message}
                  />
                </Grid>
              </Grid>
              <ButtonCustom
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
              >
                Đăng Kí
              </ButtonCustom>

              <Typography sx={{ textAlign: "center" }}>
                Đã có tài khoản?
                <Link
                  to="/log-in"
                  style={{ color: "#f43f5e", marginLeft: "5px " }}
                >
                  Đăng nhập ngay
                </Link>
              </Typography>
            </form>
          </Paper>
        </Container>
      </Overlay>
      {showSuccessModal && (
        <ModalSuccess>
          <ModalContent>
            <img
              style={{ width: "120px", marginTop: "10px" }}
              src="/img/animation_lnfs5c14_small.gif"
              alt="confirm"
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: "40px",
                color: " #f43f5e",
              }}
            >
              Đăng kí thành công
            </Typography>

            <ButtonMain onClick={() => navigate("/log-in")}>
              Đi đến trang đăng nhập
            </ButtonMain>
          </ModalContent>
        </ModalSuccess>
      )}
    </Box>
  );
}
