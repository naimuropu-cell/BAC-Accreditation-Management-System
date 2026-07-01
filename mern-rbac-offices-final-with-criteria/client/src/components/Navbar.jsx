import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FaDownload, FaHome } from "react-icons/fa";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaBook } from "react-icons/fa";
import { IoDocumentSharp } from "react-icons/io5";
import { useState } from "react";
import logo from "../../src/assets/GUBLogo.svg";
import { IoDocuments } from "react-icons/io5";


export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="GUB Logo" className="h-12" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">

            {/* Annex */}
            <Link
              to="/annex"
              className="flex items-center text-emerald-700 text-sm font-medium hover:text-emerald-900"
            >
              <IoDocuments className="mr-1" /> Annex
            </Link>


            {/* Book Highlight */}
            <Link
              to="/book-highlight"
              className="flex items-center text-emerald-700 text-sm font-medium hover:text-emerald-900"
            >
              <FaDownload className="mr-1" /> Book Highlight
            </Link>



            {/* BacBook */}
            <Link
              to="/BacBook"
              className="flex items-center text-emerald-700 text-sm font-medium hover:text-emerald-900"
            >
              <FaBook className="mr-1" /> BAC Book
            </Link>

            {/* BacChapter */}
            <Link
              to="/BacChapter"
              className="flex items-center text-emerald-700 text-sm font-medium hover:text-emerald-900"
            >
              <IoDocumentSharp className="mr-1" /> BAC Chapter
            </Link>

            {/* Home */}
            <Link
              to="/"
              className="flex items-center text-emerald-700 text-sm font-medium hover:text-emerald-900"
            >
              <FaHome className="mr-1" /> Home
            </Link>

            <Link
              to="/list"
              className="flex items-center text-emerald-700 text-sm font-medium hover:text-emerald-900"
            >
              <FaHome className="mr-1" /> Standard
            </Link>


            {/* Standards */}
            <Link
              to="/standards"
              className="flex items-center text-emerald-700 text-sm font-medium hover:text-emerald-900"
            >
              <RxHamburgerMenu className="mr-1" /> Standards
            </Link>

            {/* Office */}
            <Link
              to="/office"
              className="flex items-center text-emerald-700 text-sm font-medium hover:text-emerald-900"
            >
              <HiMiniBuildingOffice2 className="mr-1" /> Office
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="text-emerald-700 font-medium">
                  {user.displayName} ({user.role})
                </button>

                <div className="absolute right-[-32] mt-2 w-28 bg-base-100 shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition z-10 border">
                  <ul className="py-2 text-sm">
                    <li>
                      <button
                        onClick={() =>
                          navigate(`/dashboard/${user.role.toLowerCase()}`)
                        }
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </button>
                    </li>


                    <li>
                      <button
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-emerald-700 font-medium hover:text-emerald-900 Z-[-2] "
              >
                Login
              </Link>
            )}
          </div>


          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-emerald-700 focus:outline-none"
            >
              <RxHamburgerMenu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pb-4 space-y-2 Z-[2]">
          <Link
            to="/"
            className="block text-emerald-700 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/standards"
            className="block text-emerald-700 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Standards
          </Link>
          <Link
            to="/office"
            className="block text-emerald-700 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Office
          </Link>
          {user ? (
            <>
              <button
                onClick={() => {
                  navigate(`/dashboard/${user.role.toLowerCase()}`);
                  setIsOpen(false);
                }}
                className="block w-full text-left text-emerald-700 font-medium"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                  setIsOpen(false);
                }}
                className="block w-full text-left text-emerald-700 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block text-emerald-700 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
