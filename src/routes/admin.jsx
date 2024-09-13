import React, { lazy, Suspense } from "react";
import PageTitle from "../components/Layout/PageTitle";
import Loading from "../components/Loading";

const LayoutAdmin = lazy(() => import("../components/Layout/LayoutAdmin"));
const Dashboard = lazy(() => import("../pages/DashBoard/DashBoard"));
const LoginAdmin = lazy(() => import("../pages/LoginAdmin/LoginAdmin"));
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

const AdminRoutes = [
  {
    path: "/admin",
    element: (
      <Suspense fallback={<Loading />}>
        <PageTitle title={"SkinLeLe | Admin - Login"}>
          <LoginAdmin />
        </PageTitle>
      </Suspense>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <Suspense fallback={<Loading />}>
        <PageTitle title={"SkinLeLe | Dashboard"}>
          <LayoutAdmin title={"Hi 👋, Wellcome Admin !"}>
            <Dashboard />
          </LayoutAdmin>
        </PageTitle>
      </Suspense>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <Suspense fallback={<Loading />}>
        <PageTitle title={"SkinLeLe | Admin - Danh sách sản phẩm"}>
          <LayoutAdmin title={"Danh sách sản phẩm"}>
            <ManageProduct />
          </LayoutAdmin>
        </PageTitle>
      </Suspense>
    ),
  },
  {
    path: "/admin/products/create",
    element: (
      <Suspense fallback={<Loading />}>
        <PageTitle title={"SkinLeLe | Admin - Tạo mới sản phẩm"}>
          <LayoutAdmin title={"Tạo mới sản phẩm"}>
            <CreateProduct />
          </LayoutAdmin>
        </PageTitle>
      </Suspense>
    ),
  },
  {
    path: "/admin/categories",
    element: (
      <Suspense fallback={<Loading />}>
        <PageTitle title={"SkinLeLe | Admin - Danh sách danh mục"}>
          <LayoutAdmin title={"Danh sách danh mục"}>
            <ManageCategory />
          </LayoutAdmin>
        </PageTitle>
      </Suspense>
    ),
  },
  {
    path: "/admin/brands",
    element: (
      <Suspense fallback={<Loading />}>
        <PageTitle title={"SkinLeLe | Admin - Danh sách thương hiệu"}>
          <LayoutAdmin title={"Danh sách thương hiệu"}>
            <ManageBrand />
          </LayoutAdmin>
        </PageTitle>
      </Suspense>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <Suspense fallback={<Loading />}>
        <PageTitle title={"SkinLeLe | Admin - Danh sách đơn hàng"}>
          <LayoutAdmin title={"Danh sách đơn hàng"}>
            <ManageOrder />
          </LayoutAdmin>
        </PageTitle>
      </Suspense>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <Suspense fallback={<Loading />}>
        <PageTitle title={"SkinLeLe | Admin - Danh sách người dùng"}>
          <LayoutAdmin title={"Danh sách người dùng"}>
            <ManageUser />
          </LayoutAdmin>
        </PageTitle>
      </Suspense>
    ),
  },
  {
    path: "/admin/reviews",
    element: (
      <Suspense fallback={<Loading />}>
        <PageTitle title={"SkinLeLe | Admin - Danh sách đánh giá"}>
          <LayoutAdmin title={"Danh sách đánh giá"}>
            <ManageReview />
          </LayoutAdmin>
        </PageTitle>
      </Suspense>
    ),
  },
  {
    path: "/admin/settings",
    element: (
      <Suspense fallback={<Loading />}>
        <PageTitle title={"SkinLeLe | Admin - Cài đặt"}>
          <LayoutAdmin title={"Thông tin cài đặt tài khoản"}>
            <SettingAdmin />
          </LayoutAdmin>
        </PageTitle>
      </Suspense>
    ),
  },
];

export default AdminRoutes;
