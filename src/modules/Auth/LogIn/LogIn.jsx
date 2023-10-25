// import React, { useState } from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import { object, string } from "yub";
// import { useUserContext } from "../../../context/UserContext/UserContext";
// import { useMutation } from "@tanstack/react-query";
// import { login } from "../../../APIs/userApi";
// import { Navigate, useSearchParams, Link } from "react-router-dom";
// import { Loading } from "../../../Components/Loading";
// import {
//   TextField,
//   Button,
//   Container,
//   Grid,
//   Paper,
//   Typography,
//   Checkbox,
//   FormControlLabel,
//   Box,
//   IconButton,
// } from "@mui/material";
// import InputAdornment from "@mui/material/InputAdornment";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { BackGround, Overlay } from "./index";

// const signinShema = object({
//   email: string().required("Email không được để trống"),
//   matKhau: string()
//     .required("Mật khấu không được để trống")
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
//       "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
//     ),
// });

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const { currentUser, handleSignin: onLoginSuccess } = useUserContext();

//   const [searchParams] = useSearchParams();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       email: "",
//       matKhau: "",
//     },
//     resolver: yupResolver(signinShema),
//     mode: "onTouched",
//   });

//   const {
//     mutate: handleSignin,
//     isLoading,
//     error,
//   } = useMutation({
//     mutationFn: (payload) => login(payload),
//     onSuccess: (data) => {
//       onLoginSuccess(data);
//     },
//   });

//   const onSubmit = (values) => {
//     handleSignin(values);
//   };

//   //currentUser khác null có nghĩ là user đã đăng nhập=> điều hướng về Home
//   if (currentUser) {
//     const redirectTo = searchParams.get("redirectTo");
//     return <Navigate to={redirectTo || "/"} replace />;
//   }

//   if (isLoading) return <Loading />;

//   return (
//     <Box position={"relative"}>
//       <BackGround />
//       <Overlay>
//         <Container component="main" maxWidth="xs">
//           <Paper
//             elevation={3}
//             sx={{
//               marginTop: "120px",
//               padding: "20px",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               variant="h5"
//               sx={{ color: "#ff9f1a", fontWeight: "bold" }}
//             >
//               Đăng Nhập
//             </Typography>
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               style={{ width: "100%", marginTop: "20px" }}
//             >
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Tài Khoản"
//                     color="success"
//                     variant="outlined"
//                     fullWidth
//                     {...register("taiKhoan")}
//                     error={!!errors.taiKhoan}
//                     helperText={errors.taiKhoan && errors.taiKhoan.message}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Mật khẩu"
//                     color="success"
//                     type={showPassword ? "text" : "password"}
//                     variant="outlined"
//                     fullWidth
//                     {...register("matKhau")}
//                     error={!!errors.matKhau}
//                     helperText={errors.matKhau && errors.matKhau.message}
//                     InputProps={{
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <IconButton
//                             aria-label="Toggle password visibility"
//                             onClick={() => setShowPassword(!showPassword)}
//                             edge="end"
//                           >
//                             {showPassword ? <Visibility /> : <VisibilityOff />}
//                           </IconButton>
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   {error && <Typography color="red">{error}</Typography>}
//                 </Grid>
//                 <Grid item xs={12}>
//                   <FormControlLabel
//                     control={<Checkbox color="success" />}
//                     label="Lưu Tài Khoản"
//                   />
//                 </Grid>
//               </Grid>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 disabled={isLoading}
//               >
//                 Đăng Nhập
//               </Button>
//               <Button>
//                 <Link to="/sign-up">Bạn chưa có tài khoản? Đăng kí ngay</Link>
//               </Button>
//             </form>
//           </Paper>
//         </Container>
//       </Overlay>
//     </Box>
//   );
// }
