import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "@components/Loading/Loading";
import ProviderSocket from "@/components/Layout/ProviderSocket";

const PageTitle = lazy(() => import("@components/Layout/PageTitle"));
const LayoutUser = lazy(() => import("@components/Layout/LayoutUser"));
const AuthUserWapper = lazy(() => import("@components/Auth/AuthUserWapper"));

// Lazy load all page components
const Home = lazy(() => import("@pages/Home/Home"));
const Auth = lazy(() => import("@pages/Auth/Auth"));
const Detail = lazy(() => import("@pages/Detail/Detail"));
const Cart = lazy(() => import("@pages/Cart/Cart"));
const Account = lazy(() => import("@pages/Account/Account"));
const OrderReturn = lazy(() => import("@pages/OrderReturn/OrderReturn"));
const Category = lazy(() => import("@pages/Category/Category"));
const Brand = lazy(() => import("@pages/Brand/Brand"));
const Promotion = lazy(() => import("@pages/Promotion/Promotion"));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  return !isAuthenticated && !isLoading ? (
    <Navigate to="/auth" replace />
  ) : (
    children
  );
};

const AuthRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  return isAuthenticated && !isLoading ? <Navigate to="/" replace /> : children;
};

const WrapRoute = ({ element: Element, title, isProtected, isAuthRoute }) => (
  <Suspense fallback={<Loading />}>
    <PageTitle title={title}>
      <AuthUserWapper>
        <ProviderSocket>
          <LayoutUser>
            {isProtected ? (
              <ProtectedRoute>
                <Element />
              </ProtectedRoute>
            ) : isAuthRoute ? (
              <AuthRoute>
                <Element />
              </AuthRoute>
            ) : (
              <Element />
            )}
          </LayoutUser>
        </ProviderSocket>
      </AuthUserWapper>
    </PageTitle>
  </Suspense>
);

const routes = [
  {
    path: "/",
    element: Home,
    title: "SkinLeLe - Hãy cùng chăm sóc làn da của bạn cùng chúng tôi",
  },
  {
    path: "/auth",
    element: Auth,
    title: "Đăng nhập - Đăng ký",
    isAuthRoute: true,
  },
  { path: "/cart", element: Cart, title: "Giỏ hàng" },
  { path: "/detail/:slug", element: Detail, title: "Chi tiết sản phẩm" },
  {
    path: "/order-return",
    element: OrderReturn,
    title: "Thông tin kết quả đặt hàng",
    isProtected: true,
  },
  { path: "/account", element: Account, title: "Tài khoản", isProtected: true },
  { path: "/categories/:slug", element: Category, title: "Danh mục sản phẩm" },
  { path: "/brands/:slug", element: Brand, title: "Thương hiệu" },
  { path: "/promotions", element: Promotion, title: "Khuyến mãi hot" },
];

const UserRoutes = routes.map(
  ({ path, element, title, isProtected, isAuthRoute }) => ({
    path,
    element: (
      <WrapRoute
        element={element}
        title={title}
        isProtected={isProtected}
        isAuthRoute={isAuthRoute}
      />
    ),
  })
);

export default UserRoutes;
