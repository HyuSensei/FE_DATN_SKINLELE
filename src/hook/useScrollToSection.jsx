import { useRef } from "react";

const useScrollToSection = () => {
  const ref = useRef(null);

  const scrollToSection = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return { ref, scrollToSection };
};

export default useScrollToSection;
