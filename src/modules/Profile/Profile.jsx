import React, { useEffect, useRef, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import styled from "./Profile.module.scss";
import { useUserContext } from "../../context/UserContext/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getHistoryRoom } from "../../APIs/roomApi";
import History from "./components/History";
import { getInfor } from "../../APIs/userApi";
import ModalAvatar from "./components/ModalAvatar";
import ModalFormUser from "./components/ModalFormUser/ModalFormUser";
import { useParams } from "react-router-dom";

export default function Profile() {
  const inputFile = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFormUser, setIsOpenFormUser] = useState(false);
  const { currentUser } = useUserContext();
  const { userId } = useParams();

  const { data: listRooms = [] } = useQuery({
    queryKey: ["historyBooking"],
    queryFn: () => getHistoryRoom(userId),
    enabled: !!userId,
  });

  const { data: user = {} } = useQuery({
    queryKey: ["user"],
    queryFn: () => getInfor(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (isOpen) return;
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        ...currentUser,
        user: { ...user },
      })
    );
  }, [user]);
  return (
    <div className={styled.profile}>
      <Container
        sx={{
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
        maxWidth="md"
      >
        <Grid container spacing={3}>
          <Grid item md={3}>
            <div className={styled.profileAvatar}>
              <img src={user.avatar || "/img/avatar.jpeg"} alt="" />
              <input ref={inputFile} hidden type="file" />
              <Typography
                sx={{
                  marginTop: "20px",
                  textDecoration: "underline",
                  fontSize: "16px",
                  transition: "all 0.5s",
                  cursor: "pointer",
                  "&:hover": {
                    color: "blue",
                  },
                }}
                onClick={() => setIsOpen(true)}
              >
                Cập nhật ảnh
              </Typography>
              {isOpen && (
                <ModalAvatar
                  currentUser={currentUser}
                  user={user}
                  onClose={setIsOpen}
                />
              )}
            </div>
          </Grid>
          <Grid item md={9}>
            <div className={styled.userInfor}>
              <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                <i>Xin chào,</i> {user.name}
              </Typography>
              <Typography
                sx={{
                  marginTop: "20px",
                  textDecoration: "underline",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                  "&:hover": {
                    color: "blue",
                  },
                }}
                onClick={() => setIsOpenFormUser(true)}
              >
                Chỉnh sửa hồ sơ
              </Typography>
              {isOpenFormUser && (
                <ModalFormUser
                  onCloseFormUser={setIsOpenFormUser}
                  currentUser={currentUser}
                  user={user}
                  userId={userId}
                />
              )}
            </div>
            <div className={styled.historyBooking}>
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: "600",
                  paddingBottom: "20px",
                  borderBottom: "1px solid gray",
                }}
              >
                Phòng đã thuê
              </Typography>
              <div className={styled.listRoom}>
                {listRooms.map((room, index) => (
                  <History
                    key={index}
                    startDay={room.ngayDen}
                    endDay={room.ngayDi}
                    roomId={room.maPhong}
                  />
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
