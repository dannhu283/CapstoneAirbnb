import React, { useEffect, useRef, useState } from "react";
import ModalAvatarStyled from "./ModalUpLoadImg.module.scss";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ModalContent, ModalSuccess } from "../../../../../Components/Modal";
import { upLoadImgRoom } from "../../../../../APIs/roomApi";
import { ButtonMain } from "../../../../../Components/Button";
import ModalErro from "../../../../../Components/Modal/ModalErro";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ModalAvatar({ roomId, onClose, roomImg }) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [imgPreview, setImgPreview] = useState(roomImg);
  const [fileChanged, setFileChanged] = useState(false);
  const [openErro, setOpenErro] = useState(false);

  const handleFileChange = () => {
    setFileChanged(true);
  };
  const { mutate } = useMutation({
    mutationFn: (value) => {
      const formData = new FormData();
      const hinhAnh = fileInputRef.current.files[0];
      formData.append("formFile", hinhAnh);
      return upLoadImgRoom(roomId, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roomList"] });
      setShowSuccessModal(true);
    },
    onError: (err) => {
      setOpenErro(true);
    },
  });
  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const hinhAnh = fileInputRef.current;
  useEffect(() => {
    if (!hinhAnh || !hinhAnh.files[0]) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(hinhAnh.files[0]);

    fileReader.onload = (e) => {
      setImgPreview(e.target.result);
      setFileChanged(false);
    };
  }, [fileChanged]);

  return (
    <ModalSuccess onClose={onClose}>
      <ModalContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            className={ModalAvatarStyled.avaImg}
            src={imgPreview || "/img/avatar.jpeg"}
            alt=""
          />
          <Button
            component="label"
            variant="contained"
            color="success"
            startIcon={<CloudUploadIcon />}
          >
            Tải ảnh
            <VisuallyHiddenInput
              ref={fileInputRef}
              onChange={handleFileChange}
              type="file"
            />
          </Button>
        </Box>
        <div className={ModalAvatarStyled.btnAva}>
          <Button
            onClick={() => onClose(false)}
            sx={{
              marginRight: "10px",
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            Huỷ
          </Button>
          <Button
            onClick={mutate}
            sx={{ textTransform: "capitalize", fontWeight: "500" }}
            variant="contained"
          >
            Lưu
          </Button>
        </div>
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
                Cập Nhật Thành Công
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
      </ModalContent>
    </ModalSuccess>
  );
}
