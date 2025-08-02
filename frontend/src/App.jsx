import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UploadResume from "./components/UploadResume";
import RoadmapPage from "./components/RoadmapPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<UploadResume />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="*"
          element={<div className="p-6 text-center text-red-500 text-xl">404 - Page Not Found</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
