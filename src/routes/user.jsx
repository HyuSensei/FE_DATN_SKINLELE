// import React, { lazy, Suspense } from "react";
// import PageTitle from "../components/Layout/PageTitle";
// import Loading from "../components/Loading";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const LayoutUser = lazy(() => import("../components/Layout/LayoutUser"));
// const AuthUserWapper = lazy(() => import("../components/Auth/AuthUserWapper"));
// const Home = lazy(() => import("../pages/Home/Home"));
// const Auth = lazy(() => import("../pages/Auth/Auth"));
// const Detail = lazy(() => import("../pages/Detail/Detail"));
// const Cart = lazy(() => import("../pages/Cart/Cart"));
// const Account = lazy(() => import("../pages/Account/Account"));
// const OrderReturn = lazy(() => import("../pages/OrderReturn/OrderReturn"));
// const Category = lazy(() => import("../pages/Category/Category"));
// const Brand = lazy(() => import("../pages/Brand/Brand"));

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
//   if (!isAuthenticated && !isLoading) {
//     return <Navigate to="/auth" replace />;
//   }
//   return children;
// };

// const AuthRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
//   if (isAuthenticated && !isLoading) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };

// const UserRoutes = [
//   {
//     path: "/",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <AuthUserWapper>
//           <LayoutUser>
//             <PageTitle title={"SkinLeLe"}>
//               <Home />
//             </PageTitle>
//           </LayoutUser>
//         </AuthUserWapper>
//       </Suspense>
//     ),
//   },
//   {
//     path: "/auth",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <AuthUserWapper>
//           <LayoutUser>
//             <PageTitle title={"Đăng nhập - Đăng ký"}>
//               <AuthRoute>
//                 <Auth />
//               </AuthRoute>
//             </PageTitle>
//           </LayoutUser>
//         </AuthUserWapper>
//       </Suspense>
//     ),
//   },
//   {
//     path: "/cart",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <AuthUserWapper>
//           <LayoutUser>
//             <PageTitle title={"Giỏ hàng"}>
//               <Cart />
//             </PageTitle>
//           </LayoutUser>
//         </AuthUserWapper>
//       </Suspense>
//     ),
//   },
//   {
//     path: "/detail/:slug",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <AuthUserWapper>
//           <LayoutUser>
//             <PageTitle title={"Chi tiết sản phẩm"}>
//               <Detail />
//             </PageTitle>
//           </LayoutUser>
//         </AuthUserWapper>
//       </Suspense>
//     ),
//   },
//   {
//     path: "/order-return",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <AuthUserWapper>
//           <LayoutUser>
//             <PageTitle title={"Thông tin kết quả đặt hàng"}>
//               <ProtectedRoute>
//                 <OrderReturn />
//               </ProtectedRoute>
//             </PageTitle>
//           </LayoutUser>
//         </AuthUserWapper>
//       </Suspense>
//     ),
//   },
//   {
//     path: "/account",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <AuthUserWapper>
//           <LayoutUser>
//             <PageTitle title={"Tài khoản"}>
//               <ProtectedRoute>
//                 <Account />
//               </ProtectedRoute>
//             </PageTitle>
//           </LayoutUser>
//         </AuthUserWapper>
//       </Suspense>
//     ),
//   },
//   {
//     path: "/categories/:slug",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <AuthUserWapper>
//           <LayoutUser>
//             <PageTitle title={"Danh mục sản phẩm"}>
//               <Category />
//             </PageTitle>
//           </LayoutUser>
//         </AuthUserWapper>
//       </Suspense>
//     ),
//   },
//   {
//     path: "/brands/:slug",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <AuthUserWapper>
//           <LayoutUser>
//             <PageTitle title={"Thương hiệu"}>
//               <Brand />
//             </PageTitle>
//           </LayoutUser>
//         </AuthUserWapper>
//       </Suspense>
//     ),
//   },
// ];

// export default UserRoutes;

import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";

const PageTitle = lazy(() => import("../components/Layout/PageTitle"));
const LayoutUser = lazy(() => import("../components/Layout/LayoutUser"));
const AuthUserWapper = lazy(() => import("../components/Auth/AuthUserWapper"));

// Lazy load all page components
const Home = lazy(() => import("../pages/Home/Home"));
const Auth = lazy(() => import("../pages/Auth/Auth"));
const Detail = lazy(() => import("../pages/Detail/Detail"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Account = lazy(() => import("../pages/Account/Account"));
const OrderReturn = lazy(() => import("../pages/OrderReturn/OrderReturn"));
const Category = lazy(() => import("../pages/Category/Category"));
const Brand = lazy(() => import("../pages/Brand/Brand"));

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
    <AuthUserWapper>
      <LayoutUser>
        <PageTitle title={title}>
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
        </PageTitle>
      </LayoutUser>
    </AuthUserWapper>
  </Suspense>
);

const routes = [
  { path: "/", element: Home, title: "SkinLeLe" },
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
