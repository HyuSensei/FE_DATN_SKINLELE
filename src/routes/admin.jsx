import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import LoadingClinic from "../components/Loading/LoadingClinic";

const PageTitle = lazy(() => import("../components/Layout/PageTitle"));
const LayoutAdmin = lazy(() => import("../components/Layout/LayoutAdmin"));
const AuthAdminWrapper = lazy(() =>
  import("../components/Auth/AuthAdminWapper")
);

// Lazy load all page components
const LoginAdmin = lazy(() => import("../pages/LoginAdmin"));
const Dashboard = lazy(() => import("../pages/DashBoard"));
const ManageProduct = lazy(() => import("../pages/ManageProduct"));
const CreateProduct = lazy(() => import("../pages/CreateProduct"));
const ManageCategory = lazy(() => import("../pages/ManageCategory"));
const ManageBrand = lazy(() => import("../pages/ManageBrand"));
const ManageOrder = lazy(() => import("../pages/ManageOrder"));
const ManageUser = lazy(() => import("../pages/ManageUser"));
const ManageReview = lazy(() => import("../pages/ManageReview"));
const SettingAdmin = lazy(() => import("../pages/SettingAdmin"));
const ManagePromotion = lazy(() => import("../pages/ManagePromotion"));
const OrderDetail = lazy(() => import("../pages/OrderDetail"));
const CreatePromotion = lazy(() => import("../pages/CreatePromotion"));
const PromotionDetail = lazy(() => import("../pages/PromotionDetail"));
const DashBoardClinic = lazy(() => import("../pages/DashBoardClinic"));
const ManageAccount = lazy(() => import("../pages/ManageAccount"));
const ManageDoctor = lazy(() => import("../pages/ManageDoctor"));
const ManageBooking = lazy(() => import("../pages/ManageBooking"));
const ManageClinic = lazy(() => import("../pages/ManageClinic"));
const CreateClinic = lazy(() => import("../pages/CreateClinic"));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticatedAdmin, isLoading } = useSelector(
    (state) => state.auth
  );
  return !isAuthenticatedAdmin && !isLoading ? (
    <Navigate to="/admin" replace />
  ) : (
    children
  );
};

const AuthRoute = ({ children }) => {
  const { isAuthenticatedAdmin, isLoading } = useSelector(
    (state) => state.auth
  );
  return isAuthenticatedAdmin && !isLoading ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    children
  );
};

const WrapAdminRoute = ({
  element: Element,
  title,
  layoutTitle,
  isProtected,
  isAuthRoute,
  isClinic = false,
}) => (
  <Suspense fallback={isClinic ? <LoadingClinic /> : <Loading />}>
    <PageTitle title={`SkinLeLe | ${title}`}>
      <AuthAdminWrapper>
        {isAuthRoute ? (
          <AuthRoute>
            <Element />
          </AuthRoute>
        ) : (
          <LayoutAdmin title={layoutTitle}>
            {isProtected ? (
              <ProtectedRoute>
                <Element />
              </ProtectedRoute>
            ) : (
              <Element />
            )}
          </LayoutAdmin>
        )}
      </AuthAdminWrapper>
    </PageTitle>
  </Suspense>
);

const adminRoutes = [
  {
    path: "/admin",
    element: LoginAdmin,
    title: "Admin - Login",
    isAuthRoute: true,
  },
  {
    path: "/admin/dashboard",
    element: Dashboard,
    title: "Dashboard",
    layoutTitle: "Hi 👋, Wellcome Admin SkinLeLe!",
    isProtected: true,
  },
  {
    path: "/admin/products",
    element: ManageProduct,
    title: "Admin - Danh sách sản phẩm",
    layoutTitle: "Danh sách sản phẩm",
    isProtected: true,
  },
  {
    path: "/admin/products/create",
    element: CreateProduct,
    title: "Admin - Tạo mới sản phẩm",
    layoutTitle: "Tạo mới sản phẩm",
    isProtected: true,
  },
  {
    path: "/admin/categories",
    element: ManageCategory,
    title: "Admin - Danh sách danh mục",
    layoutTitle: "Danh sách danh mục",
    isProtected: true,
  },
  {
    path: "/admin/brands",
    element: ManageBrand,
    title: "Admin - Danh sách thương hiệu",
    layoutTitle: "Danh sách thương hiệu",
    isProtected: true,
  },
  {
    path: "/admin/orders",
    element: ManageOrder,
    title: "Admin - Danh sách đơn hàng",
    layoutTitle: "Danh sách đơn hàng",
    isProtected: true,
  },
  {
    path: "/admin/users",
    element: ManageUser,
    title: "Admin - Danh sách người dùng",
    layoutTitle: "Danh sách người dùng",
    isProtected: true,
  },
  {
    path: "/admin/reviews",
    element: ManageReview,
    title: "Admin - Danh sách đánh giá",
    layoutTitle: "Danh sách đánh giá",
    isProtected: true,
  },
  {
    path: "/admin/settings",
    element: SettingAdmin,
    title: "Admin - Cài đặt",
    layoutTitle: "Thông tin cài đặt tài khoản",
    isProtected: true,
  },
  {
    path: "/admin/orders/:id",
    element: OrderDetail,
    title: "Admin - Chi tiết đơn hàng",
    layoutTitle: "Chi tiết đơn hàng",
    isProtected: true,
  },
  {
    path: "/admin/promotions",
    element: ManagePromotion,
    title: "Admin - Quản lý khuyến mãi",
    layoutTitle: "Danh sách khuyến mãi",
    isProtected: true,
  },
  {
    path: "/admin/promotions/create",
    element: CreatePromotion,
    title: "Admin - Tạo mới khuyến mãi",
    layoutTitle: "",
    isProtected: true,
  },
  {
    path: "/admin/promotions/:id",
    element: PromotionDetail,
    title: "Admin - Chi tiết khuyến mãi",
    layoutTitle: "",
    isProtected: true,
  },
  {
    path: "/admin/accounts",
    element: ManageAccount,
    title: "Admin - Quản lý tài khoản",
    layoutTitle: "Danh sách tài khoản quản trị",
    isProtected: true,
  },
  {
    path: "/admin/doctors",
    element: ManageDoctor,
    title: "Admin - Quản lý bác sĩ",
    layoutTitle: "Danh sách bác sĩ",
    isProtected: true,
    isClinic: true,
  },
  {
    path: "/admin/clinics",
    element: ManageClinic,
    title: "Admin - Quản lý phòng khám",
    layoutTitle: "Danh sách phòng khám",
    isProtected: true,
  },
  {
    path: "/admin/bookings",
    element: ManageBooking,
    title: "Admin - Quản lý lịch khám",
    layoutTitle: "Danh sách lịch khám",
    isProtected: true,
    isClinic: true,
  },
  {
    path: "/admin/dashboard-clinic",
    element: DashBoardClinic,
    title: "Admin - Phòng khám",
    layoutTitle: "",
    isProtected: true,
    isClinic: true,
  },
  {
    path: "/admin/clinics/create",
    element: CreateClinic,
    title: "Admin - Tạo Thông Tin Phòng khám",
    layoutTitle: "Tạo thông tin phòng khám",
    isProtected: true,
    isClinic: true,
  },
];

const AdminRoutes = adminRoutes.map(
  ({
    path,
    element,
    title,
    layoutTitle,
    isProtected,
    isAuthRoute,
    isClinic,
  }) => ({
    path,
    element: (
      <WrapAdminRoute
        element={element}
        title={title}
        layoutTitle={layoutTitle}
        isProtected={isProtected}
        isAuthRoute={isAuthRoute}
        isClinic={isClinic}
      />
    ),
  })
);

export default AdminRoutes;
