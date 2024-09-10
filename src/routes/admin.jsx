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
          <LayoutAdmin title={"Hi 👋, Wellcome admin"}>
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
];

export default AdminRoutes;
