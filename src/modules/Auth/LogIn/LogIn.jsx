import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { useUserContext } from "../../../context/UserContext/UserContext";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../APIs/userApi";
import { Link, useNavigate, Navigate, useSearchParams } from "react-router-dom";
import {
  TextField,
  Container,
  Grid,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
  IconButton,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ReplyIcon from "@mui/icons-material/Reply";
import { BackGround, Overlay } from "./index";
import { ButtonCustom } from "../../../Components/Button";

const logInShema = object({
  email: string().required("Email không được để trống"),
  password: string()
    .required("Mật khấu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
    ),
});

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { currentUser, handleSignin: onLoginSuccess } = useUserContext();

  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(logInShema),
    mode: "onTouched",
  });

  const { mutate: handleSignin, error } = useMutation({
    mutationFn: (payload) => login(payload),
    onSuccess: (data) => {
      onLoginSuccess(data);
    },
  });

  const onSubmit = (values) => {
    handleSignin(values);
  };
  //currentUser khác null có nghĩ là user đã đăng nhập=> điều hướng về Home
  if (currentUser) {
    const redirectTo = searchParams.get("redirectTo");
    return <Navigate to={redirectTo || "/"} replace />;
  }

  return (
    <Box position={"relative"}>
      <BackGround />
      <Overlay>
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={4}
            sx={{
              position: "relative",
              marginTop: "50%",
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
              sx={{ color: " #f43f5e", fontWeight: "bold" }}
            >
              Đăng Nhập
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: "100%", marginTop: "20px" }}
            >
              <Grid container spacing={2}>
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
                    label="password"
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
                  {error && <Typography color="red">{error}</Typography>}
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox color="success" />}
                    label="Lưu Tài Khoản"
                  />
                </Grid>
              </Grid>
              <ButtonCustom type="submit" variant="contained">
                Đăng Nhập
              </ButtonCustom>
              <Typography sx={{ textAlign: "center" }}>
                Chưa có tài khoản?
                <Link
                  to="/log-up"
                  style={{ color: "#f43f5e", marginLeft: "5px " }}
                >
                  Đăng kí ngay
                </Link>
              </Typography>
            </form>
          </Paper>
        </Container>
      </Overlay>
    </Box>
  );
}
