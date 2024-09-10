import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const PageTitle = ({ title, children }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
};

export default PageTitle;
