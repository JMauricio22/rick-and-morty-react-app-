import React from "react";
import PropTypes from "prop-types";
import Nav from "./Nav/Index";

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
