import React, { useEffect, useState } from "react";
import { ModalContent, ModalSuccess } from "../../../../Components/Modal";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { ButtonCustom } from "../../../../Components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../../../APIs/userApi";
import { ButtonMain } from "../../../../Components/Button";
import dayjs from "dayjs";

const signupShema = object({
  name: string().required("Tên không được để trống"),
  email: string()
    .required("email không được để trống")
    .email("email không đúng định dạng"),
  phone: string().required("Vui lòng nhập số điện thoại"),
  birthday: string().required("Ngày sinh không được để trống"),
});

export default function ModalFormUser({ userId, user, onCloseFormUser }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      id: userId,
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
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setShowSuccessModal(true);
    },
  });
  const onSubmit = (values) => {
    const formValues = {
      id: userId,
      email: values.email,
      name: values.name,
      phone: values.phone,
      birthday: values.birthday,
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
    }
  }, [user, setValue]);

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    onCloseFormUser(false);
  };

  return (
    <ModalSuccess>
      <Box sx={{ marginTop: "90px" }}>
        <ModalContent>
          <Typography
            onClick={() => onCloseFormUser(false)}
            sx={{ textAlign: "end", fontSize: "20px", cursor: "pointer" }}
          >
            X
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%", marginTop: "20px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Mã người dùng"
                  color="success"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={userId}
                />
              </Grid>
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="date"
                  color="success"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register("birthday", {
                    setValueAs: (values) => {
                      return dayjs(values).format("YYYY-MM-DD");
                    },
                  })}
                  error={!!errors.birthday}
                  helperText={errors.birthday && errors.birthday.message}
                />
              </Grid>
              {error && (
                <Typography
                  sx={{ textAlign: "center", width: "100%", marginTop: "10px" }}
                  color="red"
                >
                  {error}
                </Typography>
              )}
            </Grid>
            <ButtonCustom
              onClick={() => setShowSuccessModal(true)}
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
            >
              Cập Nhật
            </ButtonCustom>
          </form>
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
                  sx={{ fontWeight: "bold", marginBottom: "40px" }}
                >
                  Cập Nhật Thông Tin Thành Công
                </Typography>

                <ButtonMain
                  variant="contained"
                  color="primary"
                  onClick={handleCloseSuccess}
                >
                  Đồng ý
                </ButtonMain>
              </ModalContent>
            </ModalSuccess>
          )}
        </ModalContent>
      </Box>
    </ModalSuccess>
  );
}
