import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { ButtonCustom, ButtonMain } from "../../../../Components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getInfor, updateUser } from "../../../../APIs/userApi";
import Loading from "../../../../Components/Loading";
import { ModalSuccess, ModalContent } from "../../../../Components/Modal";
import dayjs from "dayjs";

const updateShema = object({
  name: string().required("Tên không được để trống"),
  email: string()
    .required("email không được để trống")
    .email("email không đúng định dạng"),
  phone: string().required("Vui lòng nhập số điện thoại"),
  birthday: string().required("Ngày sinh không được để trống"),
  id: string(),
});

export default function UpdateUser({ userId, onClose }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: user = [], isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getInfor(userId),
    enabled: !!userId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      id: "",
      email: "",
      name: "",
      phone: "",
      birthday: "",
      role: "",
    },
    resolver: yupResolver(updateShema),
    mode: "onTouched",
  });

  const { mutate: handleUpdateUser, error } = useMutation({
    mutationFn: (payload) => updateUser(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", userId]);
      setShowSuccessModal(true);
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
      role: values.role,
    };
    //call API sign up
    handleUpdateUser(formValues);
  };

  useEffect(() => {
    if (!!user) {
      setValue("id", user.id);
      setValue("birthday", user.birthday);
      setValue("email", user.email);
      setValue("name", user.name);
      setValue("phone", user.phone);
      setValue("role", user.role);
    }
  }, [user, setValue]);

  const handleCloseSuccess = () => {
    onClose();
    setShowSuccessModal(false);
  };

  if (isLoading) return <Loading />;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        ✍️✍️ Cập nhật người dùng
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", marginTop: "20px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="ID"
              color="success"
              variant="outlined"
              fullWidth
              {...register("id")}
              disabled
            />
          </Grid>

          <Grid item xs={6}>
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

          <Grid item xs={6}>
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

          <Grid item xs={6}>
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

          <Grid item xs={6}>
            <TextField
              type="datel"
              color="success"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register("birthday", {
                setValueAs: (values) => {
                  return dayjs(values).format("DD-MM-YYYY");
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
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
        >
          Cập Nhật
        </ButtonCustom>
        <ButtonMain onClick={onClose}>Đóng</ButtonMain>
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
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "40px" }}
            >
              Cập Nhật Khoản Thành Công
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
    </Box>
  );
}
