import React, { useEffect, useRef, useState } from "react";
// import { ModalContentProfile, ModalProfile } from ".";
import ModalAvatarStyled from "./ModalAvatar.module.scss";
import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAvatarUser } from "../../../../APIs/userApi";
import { ModalContent, ModalSuccess } from "../../../../Components/Modal";
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

export default function UpdateAvata({ onClose, user }) {
  console.log(user);
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const [imgPreview, setImgPreview] = useState(user.avatar);
  const [fileChanged, setFileChanged] = useState(false);
  const handleFileChange = () => {
    setFileChanged(true);
  };

  const { mutate } = useMutation({
    mutationFn: (value) => {
      const formData = new FormData();
      const hinhAnh = fileInputRef.current.files[0];
      formData.append("formFile", hinhAnh);
      return updateAvatarUser(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onClose(false);
    },
  });

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
      </ModalContent>
    </ModalSuccess>
  );
}
