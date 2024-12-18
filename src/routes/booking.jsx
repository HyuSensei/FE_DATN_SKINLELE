import AuthUserWrapper from "@/components/Auth/AuthUserWapper";
import LoadingClinic from "@/components/Loading/LoadingClinic";
import React, { lazy, Suspense } from "react";

const PageTitle = lazy(() => import("@components/Layout/PageTitle"));
const LayoutBooking = lazy(() => import("@components/Layout/LayoutBooking"));
const AuthDoctorWapper = lazy(() =>
  import("@components/Auth/AuthDoctorWapper")
);

const HomeBooking = lazy(() => import("@pages/HomeBooking"));
const DoctorOwner = lazy(() => import("@pages/DoctorOwner"));
const Doctor = lazy(() => import("@pages/Doctor"));
const Clinic = lazy(() => import("@pages/Clinic"));
const BookingHistory = lazy(() => import("@pages/BookingHistory"));
const DoctorList = lazy(() => import("@pages/DoctorList"));
const ClinicList = lazy(() => import("@pages/ClinicList"));

const WrapBookingRoute = ({
  element: Element,
  title,
  isDoctor,
  isAuth,
  isModalAuth = false,
}) => (
  <Suspense fallback={<LoadingClinic />}>
    <PageTitle title={title}>
      {isAuth ? (
        <AuthUserWrapper {...{ isModalAuth, isAuthBooking: isAuth }}>
          <LayoutBooking>
            <Element />
          </LayoutBooking>
        </AuthUserWrapper>
      ) : isDoctor ? (
        <AuthDoctorWapper>
          <LayoutBooking>
            <Element />
          </LayoutBooking>
        </AuthDoctorWapper>
      ) : (
        <LayoutBooking>
          <Element />
        </LayoutBooking>
      )}
    </PageTitle>
  </Suspense>
);

const routes = [
  {
    path: "/home-booking",
    element: HomeBooking,
    title: "SkinLeLeClinic - Phòng khám da liễu",
    isAuth: true,
  },
  {
    path: "/doctor-owner",
    element: DoctorOwner,
    title: "SkinLeLeClinic - Quản lý thông tin bác sĩ phòng khám",
    isDoctor: true,
  },
  {
    path: "/doctor-detail/:slug",
    element: Doctor,
    title: "SkinLeLeClinic - Thông tin chi tiết bác sĩ",
    isAuth: true,
  },
  {
    path: "/clinic-detail/:slug",
    element: Clinic,
    title: "SkinLeLeClinic - Thông tin chi tiết phòng khám",
    isAuth: true
  },
  {
    path: "/booking-history",
    element: BookingHistory,
    title: "SkinLeLeClinic - Lịch sử đặt khám",
    isAuth: true,
  },
  {
    path: "/doctors",
    element: DoctorList,
    title: "SkinLeLeClinic - Danh sách bác sĩ",
    isAuth: true,
  },
  {
    path: "/clinics",
    element: ClinicList,
    title: "SkinLeLeClinic - Danh sách phòng khám",
    isAuth: true,
  },
];

const BookingRoutes = routes.map(
  ({ path, element, title, isDoctor, isAuth, isModalAuth }) => ({
    path,
    element: (
      <WrapBookingRoute
        element={element}
        title={title}
        isDoctor={isDoctor}
        isAuth={isAuth}
        isModalAuth={isModalAuth}
      />
    ),
  })
);

export default BookingRoutes;
