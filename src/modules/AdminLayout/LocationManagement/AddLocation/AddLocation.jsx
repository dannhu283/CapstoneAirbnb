import React from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useState } from "react";
import { ButtonCustom, ButtonMain } from "../../../../Components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ModalContent, ModalSuccess } from "../../../../Components/Modal";
import { addLocation } from "../../../../APIs/locationApi";

export default function AddUser({ onClose }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const queryClient = useQueryClient();

  const addUserSchema = object({
    tenViTri: string()
      .required("Vị trí không được để trống"),
      tinhThanh: string()
      .required("Tỉnh thành không được để trống"),
      
      quocGia: string().required("Quốc gia không được để trống"),
      hinhAnh: string()
      .required("Hình ảnh không được để trống")
  });

  const { mutate: handleAddLocation } = useMutation({
    mutationFn: (payload) => {
      return addLocation(payload)
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
    reset,
  } = useForm({
    defaultValues: {
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    },
    resolver: yupResolver(addUserSchema),
    mode: "onTouched",
  });



  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    onClose();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        ✍️✍️Thêm vị trí
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        mt={2}
        onSubmit={handleSubmit(handleAddLocation)}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Tên vị trí"
              variant="outlined"
              fullWidth
              error={!!errors.tenViTri}
              helperText={errors.tenViTri?.message}
              {...register("tenViTri")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Tỉnh Thành"
              variant="outlined"
              fullWidth
              error={!!errors.tinhThanh}
              helperText={errors.tinhThanh?.message}
              {...register("tinhThanh")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Quốc gia"
              variant="outlined"
              fullWidth
              error={!!errors.quocGia}
              helperText={errors.quocGia?.message}
              {...register("quocGia")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Hình Ảnh"
              fullWidth
              error={!!errors.hinhAnh}
              helperText={errors.hinhAnh?.message}
              {...register("hinhAnh")}
            />
          </Grid>


        </Grid>
        <Box sx={{ display:'flex',alignItems:'center'}}>
          <ButtonMain variant="contained" type="submit">
            Thêm vị trí
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
              Thêm Vị Trí Thành Công
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
