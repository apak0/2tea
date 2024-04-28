import React, { useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import "./styles.css";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Sayfa yukarıda olduğunda düğmeyi görünür yap
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Sayfa yukarıya doğru kaydır
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Sayfa kaydırıldığında görünürlüğü kontrol et
  window.addEventListener("scroll", toggleVisibility);

  return (
    <div>
      {isVisible && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          <AiOutlineArrowUp />
        </div>
      )}
    </div>
  );
}

export default ScrollToTopButton;
