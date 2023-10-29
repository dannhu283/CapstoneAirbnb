import React from 'react'
import styled from './BookingRoom.module.scss'
import { Typography } from '@mui/material'
export default function BookingRoom() {
  return (
    <div className={styled.bookingRoom}>
      <div className={styled.bookingContent}>
        <div className={styled.bookingTitle}>
          <Typography>
            Giá tiền
          </Typography>
          <Typography>
            đánh giá và số lượng đánh giá
          </Typography>
        </div>
      </div>
    </div>
  )
}
