
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Landing from "./pages/Landing";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/Signup";
import { HomeLayout } from "./layouts/HomeLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { ProtectedRoute } from "./routes/ProtectedRoute";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ArtworkUpload from "./pages/ArtworkUpload";

import AdminDashboard from "./features/admin/pages/AdminDashboard";
import ArtworkModeration from "./features/admin/pages/ArtworkModeration";

export default function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes - All Authenticated Users */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/artworks/upload"
            element={<ArtworkUpload />}
          />

          <Route path="/home" element={<HomeLayout />}>
            <Route index element={<Navigate to="explore" replace />} />
            <Route path="explore" element={<Explore />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="competitions" element={<div>Competitions Page</div>} />
            <Route path="community" element={<div>Community Page</div>} />
            <Route path="schedule" element={<div>Schedule Page</div>} />
            <Route path="settings" element={<div>Settings Page</div>} />
          </Route>
        </Route>

        {/* Admin Routes - ADMIN Only */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="artworks" element={<ArtworkModeration />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        theme="dark"
      />
    </>
  );
}
