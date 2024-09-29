// import React, { lazy, Suspense } from "react";
// import PageTitle from "../components/Layout/PageTitle";
// import Loading from "../components/Loading";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const AuthAdminWrapper = lazy(() =>
//   import("../components/Auth/AuthAdminWapper")
// );
// const LayoutAdmin = lazy(() => import("../components/Layout/LayoutAdmin"));
// const Dashboard = lazy(() => import("../pages/DashBoard/DashBoard"));
// const LoginAdmin = lazy(() => import("../pages/LoginAdmin/LoginAdmin"));
// const ManageProduct = lazy(() =>
//   import("../pages/ManageProduct/ManageProduct")
// );
// const CreateProduct = lazy(() =>
//   import("../pages/CreateProduct/CreateProduct")
// );
// const ManageCategory = lazy(() =>
//   import("../pages/ManageCategory/ManageCategory")
// );
// const ManageBrand = lazy(() => import("../pages/ManageBrand/ManageBrand"));
// const ManageOrder = lazy(() => import("../pages/ManageOrder/ManageOrder"));
// const ManageUser = lazy(() => import("../pages/ManageUser/ManageUser"));
// const ManageReview = lazy(() => import("../pages/ManageReview/ManageReview"));
// const SettingAdmin = lazy(() => import("../pages/SettingAdmin/SettingAdmin"));

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticatedAdmin, isLoading } = useSelector(
//     (state) => state.auth
//   );
//   if (!isAuthenticatedAdmin && !isLoading) {
//     return <Navigate to="/admin" replace />;
//   }
//   return children;
// };

// const AuthRoute = ({ children }) => {
//   const { isAuthenticatedAdmin, isLoading } = useSelector(
//     (state) => state.auth
//   );
//   if (isAuthenticatedAdmin && !isLoading) {
//     return <Navigate to="/admin/dashboard" replace />;
//   }
//   return children;
// };

// const AdminRoutes = [
//   {
//     path: "/admin",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <PageTitle title={"SkinLeLe | Admin - Login"}>
//           <LoginAdmin />
//         </PageTitle>
//       </Suspense>
//     ),
//   },
//   {
//     path: "/admin/dashboard",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <PageTitle title={"SkinLeLe | Dashboard"}>
//           <LayoutAdmin title={"Hi 👋, Wellcome Admin !"}>
//             <Dashboard />
//           </LayoutAdmin>
//         </PageTitle>
//       </Suspense>
//     ),
//   },
//   {
//     path: "/admin/products",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <PageTitle title={"SkinLeLe | Admin - Danh sách sản phẩm"}>
//           <LayoutAdmin title={"Danh sách sản phẩm"}>
//             <ManageProduct />
//           </LayoutAdmin>
//         </PageTitle>
//       </Suspense>
//     ),
//   },
//   {
//     path: "/admin/products/create",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <PageTitle title={"SkinLeLe | Admin - Tạo mới sản phẩm"}>
//           <LayoutAdmin title={"Tạo mới sản phẩm"}>
//             <CreateProduct />
//           </LayoutAdmin>
//         </PageTitle>
//       </Suspense>
//     ),
//   },
//   {
//     path: "/admin/categories",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <PageTitle title={"SkinLeLe | Admin - Danh sách danh mục"}>
//           <LayoutAdmin title={"Danh sách danh mục"}>
//             <ManageCategory />
//           </LayoutAdmin>
//         </PageTitle>
//       </Suspense>
//     ),
//   },
//   {
//     path: "/admin/brands",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <PageTitle title={"SkinLeLe | Admin - Danh sách thương hiệu"}>
//           <LayoutAdmin title={"Danh sách thương hiệu"}>
//             <ManageBrand />
//           </LayoutAdmin>
//         </PageTitle>
//       </Suspense>
//     ),
//   },
//   {
//     path: "/admin/orders",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <PageTitle title={"SkinLeLe | Admin - Danh sách đơn hàng"}>
//           <LayoutAdmin title={"Danh sách đơn hàng"}>
//             <ManageOrder />
//           </LayoutAdmin>
//         </PageTitle>
//       </Suspense>
//     ),
//   },
//   {
//     path: "/admin/users",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <PageTitle title={"SkinLeLe | Admin - Danh sách người dùng"}>
//           <LayoutAdmin title={"Danh sách người dùng"}>
//             <ManageUser />
//           </LayoutAdmin>
//         </PageTitle>
//       </Suspense>
//     ),
//   },
//   {
//     path: "/admin/reviews",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <PageTitle title={"SkinLeLe | Admin - Danh sách đánh giá"}>
//           <LayoutAdmin title={"Danh sách đánh giá"}>
//             <ManageReview />
//           </LayoutAdmin>
//         </PageTitle>
//       </Suspense>
//     ),
//   },
//   {
//     path: "/admin/settings",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <PageTitle title={"SkinLeLe | Admin - Cài đặt"}>
//           <LayoutAdmin title={"Thông tin cài đặt tài khoản"}>
//             <SettingAdmin />
//           </LayoutAdmin>
//         </PageTitle>
//       </Suspense>
//     ),
//   },
// ];

// export default AdminRoutes;

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
    layoutTitle: "Hi 👋, Wellcome Admin !",
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
