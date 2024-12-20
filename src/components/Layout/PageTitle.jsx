// import React, { useEffect } from "react";
// import { Helmet } from "react-helmet";
// import { useDispatch, useSelector } from "react-redux";
// import { io } from "socket.io-client";
// import { SocketActions } from "@redux/socket/socket.slice";

// const SOCKET_SERVER_URL = import.meta.env.VITE_APP_API_BASE_URL;

// const PageTitle = ({ title, children }) => {
//   const dispatch = useDispatch();
//   const { isAuthenticated, isAuthenticatedAdmin, userInfo, adminInfo } =
//     useSelector((state) => state.auth);

//   useEffect(() => {
//     document.title = title;
//   }, [title]);

//   useEffect(() => {
//     if (isAuthenticated && userInfo._id) {
//       const socketConnect = io(SOCKET_SERVER_URL, {
//         query: {
//           userId: userInfo._id,
//           userType: "customer",
//         },
//       });

//       dispatch(SocketActions.setSocketCustomer(socketConnect));

//       return () => {
//         socketConnect.disconnect();
//         dispatch(SocketActions.setSocketCustomer(null));
//       };
//     }
//   }, [isAuthenticated, userInfo]);

//   useEffect(() => {
//     if (isAuthenticatedAdmin && adminInfo._id) {
//       const socketConnect = io(SOCKET_SERVER_URL, {
//         query: {
//           userId: adminInfo._id,
//           userType: "admin",
//         },
//       });

//       dispatch(SocketActions.setSocketAdmin(socketConnect));

//       return () => {
//         socketConnect.disconnect();
//         dispatch(SocketActions.setSocketAdmin(null));
//       };
//     }
//   }, [isAuthenticatedAdmin, adminInfo]);

//   return (
//     <>
//       <Helmet>
//         <title>{title}</title>
//       </Helmet>
//       {children}
//     </>
//   );
// };

// export default PageTitle;

import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { SocketActions } from "@redux/socket/socket.slice";

const SOCKET_SERVER_URL = import.meta.env.VITE_APP_API_BASE_URL;
const SITE_NAME = "Skinlele";
const DEFAULT_DESCRIPTION =
  "Skinlele - Trang web chuyên cung cấp mỹ phẩm và dịch vụ chăm sóc da tốt nhất, uy tín, và an toàn.";
const DEFAULT_KEYWORDS =
  "mỹ phẩm, skincare, chăm sóc da, Skinlele, hợp tác phòng khám da liễu";

const PageTitle = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogImage = "https://skinlele.vercel.app/images/og/default.png",
  children,
}) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isAuthenticatedAdmin, userInfo, adminInfo } =
    useSelector((state) => state.auth);

  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = window.location.href.split("?")[0];

  useEffect(() => {
    document.title = fullTitle;
  }, [fullTitle]);

  // Socket connection for authenticated customer
  useEffect(() => {
    if (isAuthenticated && userInfo?._id) {
      const socketConnect = io(SOCKET_SERVER_URL, {
        query: {
          userId: userInfo._id,
          userType: "customer",
        },
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socketConnect.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      dispatch(SocketActions.setSocketCustomer(socketConnect));

      return () => {
        socketConnect.disconnect();
        dispatch(SocketActions.setSocketCustomer(null));
      };
    }
  }, [isAuthenticated, userInfo, dispatch]);

  // Socket connection for authenticated admin
  useEffect(() => {
    if (isAuthenticatedAdmin && adminInfo?._id) {
      const socketConnect = io(SOCKET_SERVER_URL, {
        query: {
          userId: adminInfo._id,
          userType: "admin",
        },
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socketConnect.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      dispatch(SocketActions.setSocketAdmin(socketConnect));

      return () => {
        socketConnect.disconnect();
        dispatch(SocketActions.setSocketAdmin(null));
      };
    }
  }, [isAuthenticatedAdmin, adminInfo, dispatch]);

  // Schema markup for SEO
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: "https://skinlele.vercel.app",
    description: description,
    potentialAction: {
      "@type": "SearchAction",
      target: "https://skinlele.vercel.app/auth",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="vi_VN" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content={SITE_NAME} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="Vietnamese" />
        <meta name="revisit-after" content="7 days" />

        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>
      <main role="main" id="main-content">
        {children}
      </main>
    </>
  );
};

export default PageTitle;
