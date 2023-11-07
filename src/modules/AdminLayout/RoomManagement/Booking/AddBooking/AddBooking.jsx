import React from "react";
import { Box, Grid, TextField, Typography, FormControl } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useState } from "react";
import { ButtonCustom, ButtonMain } from "../../../../../Components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ModalContent, ModalSuccess } from "../../../../../Components/Modal";
import { bookingRoom } from "../../../../../APIs/roomApi";
import dayjs from "dayjs";

export default function AddUser({ onClose }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const queryClient = useQueryClient();

  const addBookingSchema = object({
    maPhong: string().required("Mã phòng không được để trống"),
    maNguoiDung: string().required("Mã người dùng không được để trống"),
    ngayDen: string().matches(/^\d{4}-\d{2}-\d{2}$/, "Vui lòng chọn ngày đến"),
    ngayDi: string().matches(/^\d{4}-\d{2}-\d{2}$/, "Vui lòng chọn ngày đi"),
    soLuongKhach: string()
      .required("Vui lòng không được để trống")
      .test(
        "is-positive",
        "Số lượng khách phải lớn hơn 0",
        (value) => parseInt(value) > 0
      ),
  });

  const { mutate: handleAddBooking } = useMutation({
    mutationFn: (payload) => {
      return bookingRoom(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("location");
      setShowSuccessModal(true);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      maPhong: "",
      maNguoiDung: "",
      ngayDen: "",
      ngayDi: "",
      soLuongKhach: "",
    },
    resolver: yupResolver(addBookingSchema),
    mode: "onTouched",
  });

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    onClose();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        ✍️✍️Thêm Đặt Phòng Mới
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        mt={2}
        onSubmit={handleSubmit(handleAddBooking)}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Mã Phòng"
              variant="outlined"
              fullWidth
              error={!!errors.maPhong}
              helperText={errors.maPhong?.message}
              {...register("maPhong")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Mã Người Dùng"
              fullWidth
              error={!!errors.maNguoiDung}
              helperText={errors.maNguoiDung?.message}
              {...register("maNguoiDung")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số Lượng Khách"
              fullWidth
              error={!!errors.soLuongKhach}
              helperText={errors.soLuongKhach?.message}
              {...register("soLuongKhach")}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ marginRight: "20px" }}>Ngày Đến</Typography>
            <FormControl color="success">
              <TextField
                color="success"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("ngayDen", {
                  setValueAs: (values) => {
                    return dayjs(values).format("YYYY-MM-DD");
                  },
                })}
                error={!!errors.ngayDen}
                helperText={errors.ngayDen && errors?.ngayDen.message}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ marginRight: "20px" }}>Ngày Đi</Typography>
            <FormControl color="success">
              <TextField
                color="success"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("ngayDi", {
                  setValueAs: (values) => {
                    return dayjs(values).format("YYYY-MM-DD");
                  },
                })}
                error={!!errors.ngayDi}
                helperText={errors.ngayDi && errors?.ngayDi.message}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <ButtonMain variant="contained" type="submit">
            Thêm Booking
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
              Thêm Đặt Phòng Thành Công
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
