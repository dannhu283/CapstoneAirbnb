import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { ButtonCustom, ButtonMain } from "../../../../Components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading";
import { ModalSuccess, ModalContent } from "../../../../Components/Modal";
import { getLocationById, updateLocation } from "../../../../APIs/locationApi";
import ModalErro from "../../../../Components/Modal/ModalErro";

const updateShema = object({
  hinhAnh: string().required("Hình ảnh không được để trống"),
  tenViTri: string().required("Vị trí không được để trống"),
  tinhThanh: string().required("Tỉnh thành không được để trống"),
  quocGia: string().required("Quốc gia không được để trống"),
  id: string(),
});

export default function UpdateLocation({ locationId, onClose }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [openErro, setOpenErro] = useState(false);
  const queryClient = useQueryClient();

  const { data: location = [], isLoading } = useQuery({
    queryKey: ["locationById", locationId],
    queryFn: () => getLocationById(locationId),
    enabled: !!locationId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      id: "",
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    },
    resolver: yupResolver(updateShema),
    mode: "onTouched",
  });

  const { mutate: handleUpdateLocation, error } = useMutation({
    mutationFn: (payload) => updateLocation(locationId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["location", locationId]);
      setShowSuccessModal(true);
    },
    onError: (err) => {
      setOpenErro(true);
    },
  });

  const onSubmit = (values) => {
    const formValues = {
      tenViTri: values.tenViTri,
      tinhThanh: values.tinhThanh,
      quocGia: values.quocGia,
      id: locationId,
      hinhAnh: values.hinhAnh,
    };
    //call API sign up
    handleUpdateLocation(formValues);
  };

  useEffect(() => {
    if (!!location) {
      setValue("id", location.id);
      setValue("tenViTri", location.tenViTri);
      setValue("tinhThanh", location.tinhThanh);
      setValue("quocGia", location.quocGia);
      setValue("hinhAnh", location.hinhAnh);
    }
  }, [location, setValue]);

  const handleCloseSuccess = () => {
    onClose();
    setShowSuccessModal(false);
  };

  if (isLoading) return <Loading />;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        ✍️✍️ Cập nhật vị trí
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
              label="Tên vị trí"
              color="success"
              variant="outlined"
              fullWidth
              {...register("tenViTri")}
              error={!!errors.tenViTri}
              helperText={errors.tenViTri && errors.tenViTri.message}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Tỉnh thành"
              color="success"
              variant="outlined"
              fullWidth
              {...register("tinhThanh")}
              error={!!errors.tinhThanh}
              helperText={errors.tinhThanh && errors.tinhThanh.message}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Quốc gia"
              color="success"
              variant="outlined"
              fullWidth
              {...register("quocGia")}
              error={!!errors.quocGia}
              helperText={errors.quocGia && errors.quocGia.message}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Hình ảnh"
              color="success"
              variant="outlined"
              fullWidth
              {...register("hinhAnh")}
              error={!!errors.hinhAnh}
              helperText={errors.hinhAnh && errors.hinhAnh.message}
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
              Cập Nhật Vị Trí Thành Công
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

      {/* Modal báo lỗi */}

      <ModalErro openErro={openErro} setOpenErro={setOpenErro} />
    </Box>
  );
}
