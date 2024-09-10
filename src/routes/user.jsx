import React, { lazy, Suspense } from "react";
import PageTitle from "../components/Layout/PageTitle";
import Loading from "../components/Loading";

const LayoutUser = lazy(() => import("../components/Layout/LayoutUser"));
const AuthUserWapper = lazy(() => import("../components/Auth/AuthUserWapper"));
const Home = lazy(() => import("../pages/Home/Home"));

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
];

export default UserRoutes;
