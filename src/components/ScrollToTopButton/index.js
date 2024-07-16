import React, { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import "./styles.css";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Listener ekleyerek sayfanın aşağısına inildiğinde düğmeyi göster
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Listener temizleme
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowCircleUp size={30} />
        </div>
      )}
    </>
  );
};

export default ScrollToTopButton;
