import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";

const PageTitle = lazy(() => import("../components/Layout/PageTitle"));
const LayoutAdmin = lazy(() => import("../components/Layout/LayoutAdmin"));
const AuthAdminWrapper = lazy(() =>
  import("../components/Auth/AuthAdminWapper")
);

// Lazy load all page components
const LoginAdmin = lazy(() => import("../pages/LoginAdmin/LoginAdmin"));
const Dashboard = lazy(() => import("../pages/DashBoard/DashBoard"));
const ManageProduct = lazy(() =>
  import("../pages/ManageProduct/ManageProduct")
);
const CreateProduct = lazy(() =>
  import("../pages/CreateProduct/CreateProduct")
);
const ManageCategory = lazy(() =>
  import("../pages/ManageCategory/ManageCategory")
);
const ManageBrand = lazy(() => import("../pages/ManageBrand/ManageBrand"));
const ManageOrder = lazy(() => import("../pages/ManageOrder/ManageOrder"));
const ManageUser = lazy(() => import("../pages/ManageUser/ManageUser"));
const ManageReview = lazy(() => import("../pages/ManageReview/ManageReview"));
const SettingAdmin = lazy(() => import("../pages/SettingAdmin/SettingAdmin"));
const OrderDetail = lazy(() => import("../pages/OrderDetail/OrderDetail"));

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
}) => (
  <Suspense fallback={<Loading />}>
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
];

const AdminRoutes = adminRoutes.map(
  ({ path, element, title, layoutTitle, isProtected, isAuthRoute }) => ({
    path,
    element: (
      <WrapAdminRoute
        element={element}
        title={title}
        layoutTitle={layoutTitle}
        isProtected={isProtected}
        isAuthRoute={isAuthRoute}
      />
    ),
  })
);

export default AdminRoutes;
