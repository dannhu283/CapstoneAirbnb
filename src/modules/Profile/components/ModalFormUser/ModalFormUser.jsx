import React, { useEffect, useState } from "react";
import { ModalContent, ModalSuccess } from "../../../../Components/Modal";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ButtonCustom } from "../../../../Components/Button";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getInfor, updateUser } from "../../../../APIs/userApi";
const signupShema = object({
  name: string().required("Tên không được để trống"),
  email: string()
    .required("email không được để trống")
    .email("email không đúng định dạng"),
  phone: string().required("Vui lòng nhập số điện thoại"),
  birthday: string().required("Ngày sinh không được để trống"),
});

export default function ModalFormUser({ userId, user,currentUser,onCloseFormUser }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  console.log(user);
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      birthday: "",
    },
    resolver: yupResolver(signupShema),
    mode: "onTouched",
  });
  const {
    mutate: handleUpdateUser,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => updateUser(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['user']})
    },
  });
  const onSubmit = (values) => {
    const formValues = {
      email: values.email,
      name: values.name,
      phone: values.phone,
      birthday: values.birthday,
      id: userId,
      gender: true,
      role: "USER",
    };
    //call API sign up
    handleUpdateUser(formValues);
  };

  useEffect(() => {
    if (!!user) {
      setValue("birthday", user.birthday);
      setValue("email", user.email);
      setValue("name", user.name);
      setValue("phone", user.phone);
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...currentUser,
          user: { ...currentUser.user, name: user.name },
        })
      );
    }
  }, [user]);

  return (
    <ModalSuccess>
      <Box sx={{ marginTop: "90px" }}>
        <ModalContent>
          <Typography onClick={()=>onCloseFormUser(false)} sx={{textAlign:'end',fontSize:'20px',cursor:'pointer'}}>X</Typography>
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
                  label="Số Điện Thoại"
                  color="success"
                  variant="outlined"
                  fullWidth
                  {...register("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone && errors.phone.message}
                />
                {/* {error && <Typography color="red">{error}</Typography>} */}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="date"
                  color="success"
                  variant="outlined"
                  fullWidth
                  {...register("birthday")}
                  // error={!!errors.birthday}
                  // helperText={errors.birthday && errors.birthday.message}
                />
              </Grid>
            </Grid>
            <ButtonCustom
              type="submit"
              fullWidth
              variant="contained"
              // disabled={isLoading}
            >
              Cập Nhật
            </ButtonCustom>
          </form>
        </ModalContent>
      </Box>
    </ModalSuccess>
  );
}
