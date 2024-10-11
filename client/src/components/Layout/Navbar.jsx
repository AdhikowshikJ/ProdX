import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Trophy,
  User,
  LogIn,
  Sparkles,
  PlusCircle,
  Sparkle,
} from "lucide-react";

const Navbar = () => {
  const auth = useAuth();
  const location = useLocation();
  console.log("auth is", auth);

  if (location.pathname === "/login") {
    return null;
  }

  const isCreateRoute = location.pathname === "/create";

  return (
    <nav
      className={`${
        isCreateRoute ? "bg-white" : "bg-[#fcf3e4]"
      } border-b-2 border-[#399373] shadow-md sticky top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-[#399373] hover:text-[#ffb54d] transition-colors duration-200 flex items-center gap-2"
            >
              <Sparkles className="w-8 h-8 text-[#ffb54d] " />
              <span className="hidden sm:inline">ProdX</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {auth.user && (
              <Link
                to="/create"
                className={`text-[#399373] hover:text-white px-4 py-2 rounded-xl ${
                  isCreateRoute ? "bg-[#399373] text-white" : "bg-white"
                } hover:bg-[#399373] transition-all duration-200 font-medium flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105`}
              >
                <Sparkle className="w-5 h-5" />
                <span className="hidden sm:inline">Create</span>
              </Link>
            )}

            {auth.user ? (
              <Link
                to="/profile"
                className="flex items-center space-x-3 text-[#4a2b24] hover:text-[#399373] transition-colors duration-200 px-4 py-2 rounded-xl hover:bg-white group"
              >
                <div className="relative">
                  <img
                    src={auth.user.avatar}
                    alt={auth.user.name}
                    className="h-10 w-10 rounded-full border-2 border-[#399373] group-hover:border-[#ffb54d] transition-colors duration-200"
                  />
                  <User className="absolute bottom-0 right-0 w-4 h-4 text-[#399373] bg-white rounded-full p-[2px] border border-[#399373] group-hover:text-[#ffb54d] group-hover:border-[#ffb54d] transition-colors duration-200" />
                </div>
                <span className="hidden sm:inline font-medium group-hover:underline">
                  {auth.user.name}
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-[#399373] hover:text-white px-6 py-2 rounded-xl bg-white hover:bg-[#399373] transition-all duration-200 font-medium flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
