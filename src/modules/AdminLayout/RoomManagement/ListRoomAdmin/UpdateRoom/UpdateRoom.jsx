import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
// import { addMovie } from "../../../../APIs/movieAPI";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Rating,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import { ButtonMain } from "../../../../../Components/Button";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { addRoom, getRoomDetail, updateRoom } from "../../../../../APIs/roomApi";
import { ModalContent, ModalSuccess } from "../../../../../Components/Modal";
import Loading from "../../../../../Components/Loading";
// import { ModalSuccess, ModalContent } from "../../../../Components/Modal";

//MUI switch
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function UpdateRoom({onClose,roomId}) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();
  const [mayGiat, setmayGiat] = useState(false);
  const [banLa, setbanLa] = useState(false);
  const [tivi, settivi] = useState(false);
  const [dieuHoa, setdieuHoa] = useState(false);
  const [wifi, setwifi] = useState(false);
  const [bep, setbep] = useState(false);
  const [doXe, setdoXe] = useState(false);
  const [hoBoi, sethoBoi] = useState(false);
  const [banUi, setbanUi] = useState(false);

const queryClient = useQueryClient()
const { data: room = [], isLoading } = useQuery({
  queryKey: ["roomById", roomId],
  queryFn: () => getRoomDetail(roomId),
  enabled: !!roomId,
});
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tenPhong: "",
      khach: 0,
      phongNgu: 0,
      giuong: 0,
      phongTam: 0,
      moTa: "",
      giaTien: 0,
      maViTri: 0,
      hinhAnh: "",
    },
    // resolver: yupResolver(addmovieShema),
    mode: "onTouched",
  });

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    onClose()
  };

  console.log(roomId);
  const { mutate: onSubmit, error } = useMutation({
    mutationFn: (values) => {
      const formValues = {
        id: roomId,
        tenPhong: values.tenPhong,
        khach: values.khach,
        phongNgu: values.phongNgu,
        giuong: values.giuong,
        phongTam: values.phongTam,
        moTa: values.moTa,
        giaTien: values.giaTien,
        mayGiat: mayGiat,
        banLa: banLa,
        tivi: tivi,
        dieuHoa: dieuHoa,
        wifi: wifi,
        bep: bep,
        doXe: doXe,
        hoBoi: hoBoi,
        banUi: banUi,
        maViTri: values.maViTri,
        hinhAnh: values.hinhAnh,
      };
      return updateRoom(roomId,formValues);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['roomList']);
      setShowSuccessModal(true);
    },
  });

  useEffect(() => {
    if (!!room) {
      setValue("tenPhong", room.tenPhong);
      setValue("khach", room.khach);
      setValue("phongNgu", room.phongNgu);
      setValue("giuong", room.giuong);
      setValue("phongTam",room.phongTam)
      setValue("moTa",room.moTa)
      setValue("giaTien",room.giaTien)
      setValue("mayGiat",room.mayGiat)
      setValue("banLa",room.banLa)
      setValue("tivi",room.tivi)
      setValue("dieuHoa",room.dieuHoa)
      setValue("wifi",room.wifi)
      setValue("bep",room.bep)
      setValue("doXe",room.doXe)
      setValue("hoBoi",room.hoBoi)
      setValue("banUi",room.banUi)
      setValue("maViTri",room.maViTri)
      setValue("hinhAnh", room.hinhAnh)
    }
  }, [room]);
  if (isLoading) return <Loading />;
  return (
    <Container>
      <Box mt={7} sx={{display:'flex',justifyContent:'space-between'}}>
        <Typography variant="h4" gutterBottom>
          🎬🎬Thêm Phòng
        </Typography>
        <Typography onClick={onClose} sx={{color:'blue',cursor:'pointer'}} variant="h4" gutterBottom>
          X
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* ten */}
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Tên phòng"
              variant="outlined"
              color="success"
              {...register("tenPhong")}
              error={!!errors.tenPhong}
              helperText={errors.tenPhong && errors.tenPhong.message}
            />
          </Grid>
          {/* bidanh */}
          <Grid item xs={12} sm={4}>
            <TextField
              type="number"
              fullWidth
              label="Khách"
              color="success"
              {...register("khach")}
              variant="outlined"
              error={!!errors.khach}
              helperText={errors.khach && errors.khach.message}
            />
          </Grid>
          {/* trailer */}
          <Grid item xs={12} sm={4}>
            <TextField
              type="number"
              fullWidth
              label="phongNgu"
              variant="outlined"
              color="success"
              {...register("phongNgu")}
              error={!!errors.phongNgu}
              helperText={errors.phongNgu && errors.phongNgu.message}
            />
          </Grid>
          {/* ngaykhoichieu */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="giuong"
              color="success"
              variant="outlined"
              // InputLabelProps={{ shrink: true }}
              {...register("giuong")}
              error={!!errors.giuong}
              helperText={errors.giuong && errors.giuong.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="phongTam"
              color="success"
              variant="outlined"
              // InputLabelProps={{ shrink: true }}
              {...register("phongTam")}
              error={!!errors.phongTam}
              helperText={errors.phongTam && errors.phongTam.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="giaTien"
              color="success"
              variant="outlined"
              // InputLabelProps={{ shrink: true }}
              {...register("giaTien")}
              error={!!errors.giaTien}
              helperText={errors.giaTien && errors.giaTien.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="maViTri"
              color="success"
              variant="outlined"
              // InputLabelProps={{ shrink: true }}
              {...register("maViTri")}
              error={!!errors.maViTri}
              helperText={errors.maViTri && errors.maViTri.message}
            />
          </Grid>
          {/* mota */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Mô tả"
              variant="outlined"
              color="success"
              {...register("moTa")}
              multiline
              error={!!errors.moTa}
              helperText={errors.moTa && errors.moTa.message}
            />
          </Grid>
          {/* hinhanh */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Hình Ảnh"
              variant="outlined"
              color="success"
              {...register("hinhAnh")}
              multiline
              error={!!errors.hinhAnh}
              helperText={errors.hinhAnh && errors.hinhAnh.message}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => setmayGiat(!mayGiat)}
                  checked={mayGiat}
                />
              }
              label="mayGiat"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => setbanLa(!banLa)}
                  checked={banLa}
                />
              }
              label="banLa"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => settivi(!tivi)}
                  checked={tivi}
                />
              }
              label="tivi"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => setdieuHoa(!dieuHoa)}
                  checked={dieuHoa}
                />
              }
              label="dieuHoa"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => setwifi(!wifi)}
                  checked={wifi}
                />
              }
              label="wifi"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => setbep(!bep)}
                  checked={bep}
                />
              }
              label="bep"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => setdoXe(!doXe)}
                  checked={doXe}
                />
              }
              label="doXe"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => sethoBoi(!hoBoi)}
                  checked={hoBoi}
                />
              }
              label="hoBoi"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => setbanUi(!banUi)}
                  checked={banUi}
                />
              }
              label="banUi"
            />
          </Grid>

          <Grid item xs={12}>
            <ButtonMain variant="contained" color="primary" type="submit">
              Thêm Phòng
            </ButtonMain>
          </Grid>
        </Grid>
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
              Thêm Phòng Thành Công
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
    </Container>
  );
}
