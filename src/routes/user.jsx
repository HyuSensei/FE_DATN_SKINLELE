import React, { lazy, Suspense } from "react";
import PageTitle from "../components/Layout/PageTitle";
import Loading from "../components/Loading";

const LayoutUser = lazy(() => import("../components/Layout/LayoutUser"));
const AuthUserWapper = lazy(() => import("../components/Auth/AuthUserWapper"));
const Home = lazy(() => import("../pages/Home/Home"));
const Auth = lazy(() => import("../pages/Auth/Auth"));
const Detail = lazy(() => import("../pages/Detail/Detail"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Account = lazy(() => import("../pages/Account/Account"));
const OrderReturn = lazy(() => import("../pages/OrderReturn/OrderReturn"));
const Category = lazy(() => import("../pages/Category/Category"));

const UserRoutes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthUserWapper>
          <LayoutUser>
            <PageTitle title={"SkinLeLe"}>
              <Home />
            </PageTitle>
          </LayoutUser>
        </AuthUserWapper>
      </Suspense>
    ),
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthUserWapper>
          <LayoutUser>
            <PageTitle title={"Đăng nhập - Đăng ký"}>
              <Auth />
            </PageTitle>
          </LayoutUser>
        </AuthUserWapper>
      </Suspense>
    ),
  },
  {
    path: "/cart",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthUserWapper>
          <LayoutUser>
            <PageTitle title={"Giỏ hàng"}>
              <Cart />
            </PageTitle>
          </LayoutUser>
        </AuthUserWapper>
      </Suspense>
    ),
  },
  {
    path: "/detail/:slug",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthUserWapper>
          <LayoutUser>
            <PageTitle title={"Chi tiết sản phẩm"}>
              <Detail />
            </PageTitle>
          </LayoutUser>
        </AuthUserWapper>
      </Suspense>
    ),
  },
  {
    path: "/order-return",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthUserWapper>
          <LayoutUser>
            <PageTitle title={"Thông tin kết quả đặt hàng"}>
              <OrderReturn />
            </PageTitle>
          </LayoutUser>
        </AuthUserWapper>
      </Suspense>
    ),
  },
  {
    path: "/account",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthUserWapper>
          <LayoutUser>
            <PageTitle title={"Tài khoản"}>
              <Account />
            </PageTitle>
          </LayoutUser>
        </AuthUserWapper>
      </Suspense>
    ),
  },
  {
    path: "/categories/:slug",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthUserWapper>
          <LayoutUser>
            <PageTitle title={"Danh mục sản phẩm"}>
              <Category />
            </PageTitle>
          </LayoutUser>
        </AuthUserWapper>
      </Suspense>
    ),
  },
];

export default UserRoutes;
