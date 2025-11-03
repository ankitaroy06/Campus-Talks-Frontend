// src/Components/Sidebar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Logo/Logo.png";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Base classes for the sidebar. On small screens the sidebar is hidden by default
  // and slides in when `open` is true. On md+ it is always visible.
  const sidebarBase =
    "bg-gradient-to-b from-slate-800 to-slate-700 text-white w-64 h-screen fixed top-0 left-0 z-50 flex flex-col justify-between transform transition-transform duration-300";

  const mobileHiddenClass = open ? "translate-x-0" : "-translate-x-full md:translate-x-0";

  return (
    <>
      {/* Mobile hamburger toggle */}
      <button
        aria-label="Open menu"
        className="md:hidden fixed top-4 left-4 z-[100] p-2.5 bg-white/95 rounded-lg shadow-lg hover:bg-white"
        onClick={() => setOpen(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Backdrop when mobile menu open */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-[90]"
        />
      )}

      <aside className={`${sidebarBase} ${mobileHiddenClass} z-[95]`}>
        {/* Top Logo Section */}
        <div>
          <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-slate-700">
            <Link
              to="/"
              className="flex items-center gap-3 cursor-pointer hover:bg-slate-700 transition"
              onClick={() => setOpen(false)}
            >
              <img src={logo} alt="CampusTalks Logo" className="h-10 w-10 object-contain" />
              <span className="text-2xl font-bold text-indigo-400">CampusTalks</span>
            </Link>
            {/* Close button for mobile */}
            <button
              onClick={() => setOpen(false)}
              className="md:hidden p-2 rounded bg-white/10 hover:bg-white/20"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-3 pt-6 px-4">
            <Link
              to="/allnotices"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-amber-400 hover:text-slate-800 transition-all font-semibold"
              onClick={() => setOpen(false)}
            >
              📋 All Notices
            </Link>

            <Link
              to="/lostfound"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-amber-400 hover:text-slate-800 transition-all font-semibold"
              onClick={() => setOpen(false)}
            >
              🕵️ Lost & Found
            </Link>

            {/* Create Post only visible to admin */}
            {user?.role === "admin" && (
              <Link
                to="/createpost"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-amber-400 hover:text-slate-800 transition-all font-semibold"
                onClick={() => setOpen(false)}
              >
                ➕ Create Post
              </Link>
            )}

            {user?.role === "admin" && (
              <Link
                to="/claimed"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-amber-400 hover:text-slate-800 transition-all font-semibold"
                onClick={() => setOpen(false)}
              >
                🧾 Claimed Items
              </Link>
            )}

            {/* NEW: Claims review page for admin */}
            {user?.role === "admin" && (
              <Link
                to="/claims"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-amber-400 hover:text-slate-800 transition-all font-semibold"
                onClick={() => setOpen(false)}
              >
                🛠️ Claims (Review)
              </Link>
            )}
          </nav>
        </div>

        {/* User Info + Login/Logout Section */}
        <div className="border-t border-slate-700 p-4 text-sm">
          {user ? (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col text-center">
                <span className="font-semibold text-indigo-300">{user.username}</span>
                <span className="text-slate-400 text-xs capitalize">{user.role}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 text-white hover:bg-amber-400 hover:text-slate-800 transition"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white hover:bg-amber-400 hover:text-slate-800 transition w-full"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </div>
      </aside>
    </>
  );
}
