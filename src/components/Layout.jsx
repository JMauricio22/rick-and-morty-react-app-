import React from "react";
import PropTypes from "prop-types";
import Nav from "./Nav/Index";

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <footer className='bg-dark text-white px-2 py-4 text-center'>
        Made with ❤ by Mauricio Lemús
      </footer>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
