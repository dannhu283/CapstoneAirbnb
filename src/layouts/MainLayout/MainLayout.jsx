import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { BackToTop } from "./index";

export default function MainLayout() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Header />

      <Outlet />

      <Footer />

      {showBackToTop && (
        <BackToTop onClick={handleBackToTop} className="back-to-top-button">
          <ExpandLessIcon sx={{ fontSize: "80px" }} />
        </BackToTop>
      )}
    </div>
  );
}
