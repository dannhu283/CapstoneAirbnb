import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFeedbacks, postFeedbacks } from "../../../../APIs/feedback";
import {
  Box,
  Button,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import styled from "./Feedback.module.scss";
import dayjs from "dayjs";
import { useUserContext } from "../../../../context/UserContext/UserContext";
import { Controller, useForm } from "react-hook-form";
export default function Feedback({ roomId, onGetFeedbacks }) {
  const queryClient = useQueryClient();
  const { currentUser } = useUserContext();
  // Thông tin user
  const user = currentUser?.user;
  // Ngày comment
  const dayComment = dayjs().format("ddd, DD MMM YYYY HH:mm:ss [GMT]");
  // input form
  const { handleSubmit, register, control, setValue } = useForm({
    defaultValues: {
      noiDung: "",
      saoBinhLuan: 0,
    },
  });

  // Lấy feedbacks từ API
  const { data: feedbacks = [] } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getFeedbacks(roomId),
  });

  // Gọi API post comments
  const { mutate: onSuccess } = useMutation({
    mutationFn: (valuesForm) => {
      const values = {
        id: user.id,
        maPhong: roomId,
        maNguoiBinhLuan: user.id,
        ngayBinhLuan: dayComment,
        noiDung: valuesForm.noiDung,
        saoBinhLuan: valuesForm.saoBinhLuan,
      };
      return postFeedbacks(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      setValue("noiDung", "");
      setValue("saoBinhLuan", 0);
    },
  });
  useEffect(() => {
    if (feedbacks.length > 0) {
      onGetFeedbacks(feedbacks);
    }
  }, [feedbacks, onGetFeedbacks]);

  return (
    <div className={styled.feedback}>
      <Grid container>
        {feedbacks.map((feedback, index) => (
          <Grid key={index} item md={6} sx={{ marginBottom: "50px" }}>
            <div className={styled.feedbackItem}>
              <img
                style={{ borderRadius: "10px" }}
                width={50}
                height={50}
                src={feedback.avatar || "/img/avatar.jpeg"}
                alt=""
              />
              <div className={styled.feedbackDetail}>
                <Typography
                  sx={{
                    fontSize: "18px",
                  }}
                >
                  {feedback.tenNguoiBinhLuan}
                </Typography>
                <Typography sx={{ fontSize: "15px", color: "gray" }}>
                  {dayjs(feedback.ngayBinhLuan).format("MM/YYYY")}
                </Typography>
                <Rating
                  name="read-only"
                  readOnly
                  value={feedback.saoBinhLuan}
                  sx={{ fontSize: "15px" }}
                />
              </div>
            </div>
            <div className={styled.feedbackDesc}>
              <Typography>{feedback.noiDung}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
      <Button
        sx={{ fontWeight: "500", fontSize: "16px", marginBottom: "50px" }}
        variant="outlined"
      >
        Hiển thị tất cả đánh giá
      </Button>

      {/* Kiểm tra User  */}
      {user && (
        <Box
          component="form"
          onSubmit={handleSubmit(onSuccess)}
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <div className={styled.addComment}>
            <img
              style={{ borderRadius: "10px" }}
              width={50}
              height={50}
              src={user.avatar || "/img/avatar.jpeg"}
              alt=""
            />
            <TextField
              id="comment"
              label="Bình luận"
              multiline
              fullWidth
              rows={4}
              name="noiDung"
              {...register("noiDung")}
            />
          </div>
          <div className={styled.btnAddComment}>
            <Typography component="legend" sx={{ paddingLeft: "5px" }}>
              Đánh giá sao
            </Typography>
            <Controller
              name="saoBinhLuan"
              control={control}
              render={({ field }) => (
                <Rating
                  sx={{ paddingBottom: "15px", fontSize: "30px" }}
                  {...field}
                />
              )}
            />
            <Button sx={{ display: "block" }} variant="contained" type="submit">
              Thêm bình luận
            </Button>
          </div>
        </Box>
      )}
    </div>
  );
}
