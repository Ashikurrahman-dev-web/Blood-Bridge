"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import { MdDashboard } from "react-icons/md";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };
  const pathname = usePathname();
  if(pathname.includes("dashboard")){
    return null;
  }
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-400 backdrop-blur-md py-3.5 px-6">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    
    <Logo />

    {/* Desktop Menu */}
    <div className="hidden md:flex items-center gap-4">
      <Link
        href="/"
        className={`text-sm font-medium transition-colors ${
          pathname === "/"
            ? "text-red-500 font-semibold"
            : "text-slate-300 hover:text-white"
        }`}
      >
        Home
      </Link>

      <Link
        href="/request"
        className={`text-sm font-medium transition-colors ${
          pathname.startsWith("/request")
            ? "text-red-500 font-semibold"
            : "text-slate-300 hover:text-white"
        }`}
      >
        Donation Requests
      </Link>

      {session && (
        <Link
          href="/funding"
          className={`text-sm font-medium transition-colors ${
            pathname.startsWith("/funding")
              ? "text-red-500 font-semibold"
              : "text-slate-300 hover:text-white"
          }`}
        >
          Funding
        </Link>
      )}
    </div>

    {/* Right Side */}
    <div className="flex items-center gap-3">

      {/* Avatar Outside Menu */}
      {session?.user && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center cursor-pointer"
          >
            <Image
              width={36}
              height={36}
              className="w-9 h-9 rounded-full object-cover border border-red-500"
              src={session.user.image || "/default-avatar.png"}
              alt="avatar"
            />
          </button>

          {dropdownOpen && (
<div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-white/10 rounded-2xl shadow-xl py-2">
              <div className="px-4 py-2 border-b border-white/10">
                <p className="text-red-500 text-xs font-bold">
                  {session.user.role} Account
                </p>
                <p className="text-white font-semibold">
                  {session.user.name}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {session.user.email}
                </p>
              </div>

              <Link
                href={`/dashboard/${session.user.role}`}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:bg-white/5"
              >
                <MdDashboard />
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
  className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 cursor-pointer"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white text-xl"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Login/Register Desktop */}
      {!session && (
        <div className="hidden md:flex items-center gap-3">
          <Link href="/signin">
            <button className="text-slate-300 hover:text-slate-500 cursor-pointer">
              Login
            </button>
          </Link>

          <Link
            href="/signup"
className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl"
          >
            SignUp
          </Link>
        </div>
      )}
    </div>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="md:hidden mt-4 border-t border-white/10 pt-4">
      <div className="flex flex-col gap-4">

        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="text-slate-700"
        >
          Home
        </Link>

        <Link
          href="/request"
          onClick={() => setMenuOpen(false)}
          className="text-slate-700"
        >
          Donation Requests
        </Link>

        {session && (
          <Link
            href="/funding"
            onClick={() => setMenuOpen(false)}
            className="text-slate-700"
          >
            Funding
          </Link>
        )}

        {!session && (
          <>
            <Link
              href="/signin"
              onClick={() => setMenuOpen(false)}
              className="text-slate-300"
            >
              Login
            </Link>

            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-center py-2 rounded-xl"
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </div>
  )}
</nav>
  );
}