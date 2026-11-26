
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { PaintLoader } from "@/components/common/PaintLoader";
import type { AppUser } from "@/context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: AppUser["role"][];
}

export function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, appUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PaintLoader size={48} />
      </div>
    );
  }

  if (!user || !appUser) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(appUser.role)
  ) {
    return <Navigate to="/home/explore" replace />;
  }

  return <Outlet />;
}
