import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PageTitle = lazy(() => import("../components/Layout/PageTitle"));
const LayoutBooking = lazy(() => import("../components/Layout/LayoutBooking"));

const HomeBooking = lazy(() => import("../pages/HomeBooking"));
const DoctorOwner = lazy(() => import("../pages/DoctorOwner"));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticatedDoctor } = useSelector((state) => state.auth);
  return !isAuthenticatedDoctor ? (
    <Navigate to="/doctor-login" replace />
  ) : (
    children
  );
};

const AuthRoute = ({ children }) => {
  const { isAuthenticatedDoctor } = useSelector((state) => state.auth);
  return isAuthenticatedDoctor ? (
    <Navigate to="/home-booking" replace />
  ) : (
    children
  );
};

const WrapBookingRoute = ({
  element: Element,
  title,
  isProtected,
  isAuthRoute,
}) => (
  <Suspense fallback={<></>}>
    <PageTitle title={title}>
      <LayoutBooking>
        {isAuthRoute ? (
          <AuthRoute>
            <Element />
          </AuthRoute>
        ) : isProtected ? (
          <ProtectedRoute>
            <Element />
          </ProtectedRoute>
        ) : (
          <Element />
        )}
      </LayoutBooking>
    </PageTitle>
  </Suspense>
);

const routes = [
  {
    path: "/home-booking",
    element: HomeBooking,
    title: "SkinLeLeClinic - Phòng khám da liễu",
  },
  {
    path: "/doctor-owner",
    element: DoctorOwner,
    title: "SkinLeLeClinic - Quản lý thông tin bác sĩ hợp tác",
  },
];

const BookingRoutes = routes.map(
  ({ path, element, title, isProtected, isAuthRoute }) => ({
    path,
    element: (
      <WrapBookingRoute
        element={element}
        title={title}
        isProtected={isProtected}
        isAuthRoute={isAuthRoute}
      />
    ),
  })
);

export default BookingRoutes;
