import React, { createContext, useContext } from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ScrollContext.Provider value={{ scrollToTop }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
