import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between">
      <h1 className="font-bold text-xl">ResumeAI</h1>
      <div className="space-x-4">
        <Link to="/">Analyzer</Link>
        <Link to="/roadmap">Roadmap</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
