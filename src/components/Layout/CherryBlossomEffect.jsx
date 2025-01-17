import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { useLocation } from "react-router-dom";

const CherryBlossomEffect = () => {
  const location = useLocation();

  useEffect(() => {
    const myCanvas = document.createElement("canvas");
    myCanvas.style.position = "fixed";
    myCanvas.style.top = "0";
    myCanvas.style.left = "0";
    myCanvas.style.width = "100%";
    myCanvas.style.height = "100%";
    myCanvas.style.pointerEvents = "none";
    myCanvas.style.zIndex = "999";
    document.body.appendChild(myCanvas);

    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });

    const duration = 5 * 1000; // Hiệu ứng hoạt động trong 5 giây
    const animationEnd = Date.now() + duration;

    const frame = () => {
      const timeLeft = animationEnd - Date.now();

      myConfetti({
        particleCount: 20, // Rơi từ 3 hạt mỗi lần
        startVelocity: 0, // Không có vận tốc ban đầu
        ticks: 1000, // Tồn tại lâu hơn
        origin: {
          x: Math.random(), // Vị trí ngang ngẫu nhiên
          y: Math.random() * -0.1, // Bắt đầu từ trên màn hình
        },
        colors: ["#ffb7c5", "#ffc0cb", "#fff0f5"], // Màu sắc nhẹ nhàng
        shapes: [confetti.shapeFromText({ text: "🌸", scalar: 1 })], // Emoji hoa anh đào lớn hơn
        gravity: 0.2, // Rơi nhẹ nhàng
        scalar: 1, // Kích thước ngẫu nhiên
        spread: 180, // Lan tỏa rộng khắp màn hình
        decay: 0.98, // Biến mất từ từ
        rotationRange: 0,
        wobble: 0,
        flat: true,
      });

      if (timeLeft > 0) {
        setTimeout(frame, 200); // Gọi lại sau mỗi 200ms để hiệu ứng thưa hơn
      }
    };

    frame();

    return () => {
      document.body.removeChild(myCanvas);
    };
  }, [location.name]);

  return null;
};

export default CherryBlossomEffect;
