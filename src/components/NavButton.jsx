import React from "react";
import { Link } from "react-router";

const NavButton = ({ to, label, primary }) => {
  return (
    <Link
      to={to}
      /* 로그인, 회원가입 스타일 */
      className={`text-sm font-bold px-4 py-1.5 rounded-sm transition-colors ${
        primary ? "bg-[#E50914] text-white hover:bg-[#b20710]" : "text-base-content hover:opacity-70"
      }`}
    >
      {label}
    </Link>
  );
};

export default NavButton;
