import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg mt-auto">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} ProdX. All rights reserved.
        </p>
        <p className="text-center text-gray-500 text-sm">
          By using ProdX, you agree to our{" "}
          <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
