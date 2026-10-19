import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Landing from "./pages/Landing";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/Signup";
import { HomeLayout } from "./layouts/HomeLayout";
import Home from "./pages/Home";

// Import your other sub-pages here as needed:
// import Competitions from "./pages/Competitions";
import Explore from "./pages/Explore";
// import Schedule from "./pages/Schedule";
// import Settings from "./pages/Settings";

export default function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Nested Home Screen Routes*/}
        <Route path="/home" element={<HomeLayout />}>
          {/* Default redirect to Explore */}
          <Route index element={<Navigate to="explore" replace />} />

          <Route path="explore" element={<Explore />} />
          <Route path="dashboard" element={<Home />} />
          <Route path="competitions" element={<div>Competitions Page</div>} />
          <Route path="community" element={<div>Community Page</div>} />
          <Route path="schedule" element={<div>Schedule Page</div>} />
          <Route path="settings" element={<div>Settings Page</div>} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={4000} theme="dark" />
    </>
  );
}