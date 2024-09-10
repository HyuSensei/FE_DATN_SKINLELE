import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRoutes from "./user";
import AdminRoutes from "./admin";
import NotFound from "../pages/NotFound/NotFound";

const Router = () => {
  return (
    <Routes>
      {UserRoutes.map((route, index) => (
        <Route
          key={`user-${index}`}
          path={route.path}
          element={route.element}
        />
      ))}
      {AdminRoutes.map((route, index) => (
        <Route
          key={`admin-${index}`}
          path={route.path}
          element={route.element}
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
