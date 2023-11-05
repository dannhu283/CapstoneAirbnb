import React from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useState } from "react";
import { ButtonCustom, ButtonMain } from "../../../../Components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "../../../../APIs/userApi";
import { ModalContent, ModalSuccess } from "../../../../Components/Modal";
import dayjs from "dayjs";

export default function AddUser({ onClose }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const queryClient = useQueryClient();

  const addUserSchema = object({
    password: string()
      .required("Mật khẩu không được để trống")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
        "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
      ),
    email: string()
      .required("Email không được để trống")
      .email("Email không đúng định dạng"),
    name: string().required("Họ tên không được để trống"),
    phone: string()
      .required("Số điện thoại không được để trống")
      .matches(/^(0[1-9][0-9]{8})$/, "Số điện thoại không đúng"),
    birthday: string().matches(
      /\d{2}\/\d{2}\/\d{4}/,
      "Vui lòng chọn ngày sinh"
    ),
    role: string().required("Vui lòng loại người dùng"),
  });

  const { mutate: handleAddUser } = useMutation({
    mutationFn: (payload) => addUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries("infors");
      setShowSuccessModal(true);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      password: "",
      email: "",
      phone: "",
      role: "",
      name: "",
      birthday: "",
    },
    resolver: yupResolver(addUserSchema),
    mode: "onTouched",
  });

  const onSubmit = (values) => {
    console.log(values);
    // Gọi API đăng ký
    handleAddUser(values);
    reset({
      password: "",
      email: "",
      phone: "",
      role: "",
      name: "",
      birthday: "",
    });
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    onClose();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        ✍️✍️Thêm người dùng
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        mt={2}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Mật khẩu"
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Họ tên"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register("name")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Số điện thoại"
              variant="outlined"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message}
              {...register("phone")}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ marginRight: "20px" }}>Ngày sinh</Typography>
            <FormControl color="success">
              <TextField
                color="success"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("birthday", {
                  setValueAs: (values) => {
                    return dayjs(values).format("DD/MM/YYYY");
                  },
                })}
                error={!!errors.birthday}
                helperText={errors.birthday && errors?.birthday.message}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth error={!!errors.role}>
              <InputLabel id="role">Mã người dùng</InputLabel>
              <Controller
                name="role"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    labelId="role"
                    id="role"
                    label="Loại người dùng"
                    {...field}
                  >
                    <MenuItem value={""}>Chọn loại người dùng</MenuItem>
                    <MenuItem value={"USER"}>Khách hàng</MenuItem>
                    <MenuItem value={"ADMIN"}>Quản trị viên</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ margin: "2% 0 0 80%" }}>
          <ButtonMain variant="contained" m="2% 0 0 0" type="submit">
            Thêm người dùng
          </ButtonMain>
          <ButtonCustom onClick={onClose}>Đóng</ButtonCustom>
        </Box>
      </Box>
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
              Thêm Tài Khoản Thành Công
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
