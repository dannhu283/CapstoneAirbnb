import React from "react";
import { Box } from "@mui/material";

export default function RoomMap() {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <iframe
        className=""
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15678.835874782257!2d106.68809554999999!3d10.7568982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m3!3e0!4m0!4m0!5e0!3m2!1svi!2s!4v1664300539026!5m2!1svi!2s"
        style={{ border: 0, width: "100%", height: "100%" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="map"
        zoom={15}
      />
    </Box>
  );
}
