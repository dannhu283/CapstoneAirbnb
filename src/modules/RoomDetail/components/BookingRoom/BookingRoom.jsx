import React, { useEffect, useState, useRef } from "react";
import styled from "./BookingRoom.module.scss";
import { Box, Button, TextField, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookingRoom, getRoomisBooked } from "../../../../APIs/roomApi";
import { useUserContext } from "../../../../context/UserContext/UserContext";

export default function BookingRoom({
  roomId,
  price,
  averageRating,
  totalReviews,
}) {
  // Lấy thông tin User
  const { currentUser } = useUserContext();
  console.log(currentUser);
  // Lấy danh sách phòng xem đã đặt hay chưa
  const { data: ListOfRoomIsBooked = [] } = useQuery({
    queryKey: ["isBooked"],
    queryFn: getRoomisBooked,
  });
  // Đóng mở canlendar
  const [isOpen, setIsOpen] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const refCalendar = useRef(null);
  const queriClient = useQueryClient();
  const [count, setCount] = useState(1);
  const [countDays, setCountDays] = useState(0);

  const { mutate: onSuccess } = useMutation({
    mutationFn: (value) => {
      const valueForm = {
        id: currentUser.user.id,
        maPhong: roomId,
        ngayDen: dayjs(selectionRange.startDate).format(),
        ngayDi: dayjs(selectionRange.endDate).format(),
        soLuongKhach: count,
        maNguoiDung: currentUser.user.id,
      };
      return bookingRoom(valueForm);
    },
    onSuccess: () => {
      queriClient.invalidateQueries({ queryKey: ["isBooked"] });
    },
  });

  console.log(selectionRange);
  useEffect(() => {
    document.addEventListener("click", clickOutSide, true);
    document.addEventListener("keydown", escKey, true);
  });
  const clickOutSide = (e) => {
    if (refCalendar.current && !refCalendar.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  const escKey = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };
  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
    const ngayDau = new Date(ranges.selection.startDate); // Ngày đầu
    const ngayCuoi = new Date(ranges.selection.endDate); // Ngày cuối
    setCountDays(Math.abs((ngayCuoi - ngayDau) / (1000 * 60 * 60 * 24)));
  };

  // Cộng trừ số lượng khách
  const handleCountPlus = () => {
    setCount(count + 1);
  };
  const handleCountMinus = () => {
    if (count === 1) return;
    setCount(count - 1);
  };

  const disabledRanges = ListOfRoomIsBooked.map((day) => {
    return { ngayDen: day.ngayDen, ngayDi: day.ngayDi };
  });
  function isDateInDisabledRange(date) {
    return disabledRanges.some((disabledRange) => {
      const start = new Date(disabledRange.ngayDen);
      const end = new Date(disabledRange.ngayDi);
      return date >= start && date <= end;
    });
  }

  return (
    <div className={styled.bookingRoom}>
      <div className={styled.bookingContent}>
        <div className={styled.bookingTitle}>
          <Typography sx={{ fontSize: "25px" }}>
            ${price}
            <span className={styled.priceOfNight}>/ đêm</span>
          </Typography>
          <p className={styled.averageRating}>
            <StarIcon sx={{ marginRight: "3px", fontSize: "17px" }} />{" "}
            {averageRating} ·
            <span className={styled.totalFeedback}>
              {totalReviews} đánh giá
            </span>
          </p>
        </div>
        <div className={styled.bookingDetail}>
          <Box
            sx={{
              display: "flex",
              border: "1px solid #B0B0B0",
              padding: "5px",
              borderTopRightRadius: "10px",
              borderTopLeftRadius: "10px",
            }}
          >
            {/* Calendar  */}
            <div onClick={() => setIsOpen(true)} className={styled.dateRight}>
              <Typography sx={{ fontSize: "11px", color: "#222222" }}>
                NHẬN PHÒNG
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#717171" }}>
                {dayjs(selectionRange.startDate).format("DD/MM/YYYY")}
              </Typography>
            </div>
            <div onClick={() => setIsOpen(true)} className={styled.dateLeft}>
              <Typography sx={{ fontSize: "11px", color: "#222222" }}>
                TRẢ PHÒNG
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#717171" }}>
                {dayjs(selectionRange.endDate).format("DD/MM/YYYY")}
              </Typography>
            </div>
          </Box>
          {isOpen && (
            <div ref={refCalendar} className={styled.wrapCalendar}>
              <DateRange
                ranges={[selectionRange]}
                onChange={handleSelect}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                months={2}
                direction="horizontal"
                rangeColors={["#f33e5b"]}
                dateDisplayFormat="dd/MM/yyyy"
                disabledDay={(date) => isDateInDisabledRange(date)}
              />
            </div>
          )}

          {/* Customer  */}
          <div className={styled.customerItem}>
            <div className={styled.customerRight}>
              <Typography sx={{ fontSize: "11px", color: "#222222" }}>
                KHÁCH
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#717171" }}>
                {count} khách
              </Typography>
            </div>
            <div className={styled.customerLeft}>
              <Typography onClick={handleCountPlus} sx={{ fontSize: "11px" }}>
                <AddCircleOutlineOutlinedIcon />
              </Typography>
              <Typography sx={{ fontSize: "18px", color: "#717171" }}>
                {count}
              </Typography>
              <Typography onClick={handleCountMinus} sx={{ fontSize: "11px" }}>
                <RemoveCircleOutlineOutlinedIcon />
              </Typography>
            </div>
          </div>
          <div className={styled.btnBookingItem}>
            <button
              onClick={onSuccess}
              type="submit"
              className={styled.btnBooking}
            >
              Đặt phòng
            </button>
          </div>
          <div className={styled.priceBeforeBooking}>
            <Typography sx={{ textDecoration: "underline", fontSize: "15px" }}>
              ${price} x {countDays} đêm
            </Typography>
            <Typography sx={{ textDecoration: "underline", fontSize: "15px" }}>
              {price * countDays}$
            </Typography>
          </div>
          <div className={styled.totalPrice}>
            <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
              Tổng tiền
            </Typography>
            <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
              {price * countDays}$
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
