import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { ButtonCustom, ButtonMain } from "../../../../../Components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooked, updateBooking } from "../../../../../APIs/roomApi";
import Loading from "../../../../../Components/Loading";
import { ModalSuccess, ModalContent } from "../../../../../Components/Modal";
import dayjs from "dayjs";

const updateBookingSchema = object({
  maPhong: string().required("Mã phòng không được để trống"),
  maNguoiDung: string().required("Mã người dùng không được để trống"),
  ngayDen: string().required("Vui lòng chọn ngày đến"),
  ngayDi: string().required("Vui lòng chọn ngày đi"),
  soLuongKhach: string()
    .required("Số lượng khách không được để trống")
    .test(
      "is-positive",
      "Số lượng khách phải lớn hơn 0",
      (value) => parseInt(value) > 0
    ),
});

export default function UpdateBooking({ userId, onClose }) {
  console.log(userId);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: booked = [], isLoading } = useQuery({
    queryKey: ["booked", userId],
    queryFn: () => getBooked(userId),
    enabled: !!userId,
  });

  console.log(booked);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      maPhong: "",
      maNguoiDung: "",
      ngayDen: "",
      ngayDi: "",
      soLuongKhach: "",
    },
    resolver: yupResolver(updateBookingSchema),
    mode: "onTouched",
  });

  const { mutate: handleUpdatebooked, error } = useMutation({
    mutationFn: (payload) => updateBooking(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["booked", userId]);
      setShowSuccessModal(true);
    },
  });

  const onSubmit = (values) => {
    const formValues = {
      maPhong: values.maPhong,
      maNguoiDung: values.maNguoiDung,
      ngayDen: values.ngayDen,
      ngayDi: values.ngayDi,
      soLuongKhach: values.soLuongKhach,
      id: userId,
    };
    //call API sign up
    handleUpdatebooked(formValues);
  };

  useEffect(() => {
    if (!!booked) {
      setValue("id", booked.id);
      setValue("maPhong", booked.maPhong);
      setValue("maNguoiDung", booked.maNguoiDung);
      setValue("ngayDen", booked.ngayDen);
      setValue("ngayDi", booked.ngayDi);
      setValue("soLuongKhach", booked.soLuongKhach);
    }
  }, [booked, setValue]);

  const handleCloseSuccess = () => {
    onClose();
    setShowSuccessModal(false);
  };

  if (isLoading) return <Loading />;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        ✍️✍️ Cập nhật Booking
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
              label="Mã Phòng"
              color="success"
              variant="outlined"
              fullWidth
              {...register("maPhong")}
              error={!!errors.maPhong}
              helperText={errors.maPhong && errors.maPhong.message}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Mã Người Dùng"
              color="success"
              variant="outlined"
              fullWidth
              {...register("maNguoiDung")}
              error={!!errors.maNguoiDung}
              helperText={errors.maNguoiDung && errors.maNguoiDung.message}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Số Lượng Khách"
              color="success"
              variant="outlined"
              fullWidth
              {...register("soLuongKhach")}
              error={!!errors.soLuongKhach}
              helperText={errors.soLuongKhach && errors.soLuongKhach.message}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Ngày Đến"
              color="success"
              variant="outlined"
              fullWidth
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              {...register("ngayDen", {
                setValueAs: (values) => {
                  return dayjs(values).format("DD-MM-YYYY");
                },
              })}
              error={!!errors.ngayDen}
              helperText={errors.ngayDen && errors.ngayDen.message}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              color="success"
              variant="outlined"
              fullWidth
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              {...register("ngayDi", {
                setValueAs: (values) => {
                  return dayjs(values).format("DD-MM-YYYY");
                },
              })}
              error={!!errors.ngayDi}
              helperText={errors.ngayDi && errors.ngayDi.message}
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
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "40px" }}
            >
              Cập Nhật Booking Thành Công
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
