import { Navigate, useLocation } from "react-router-dom";
import { useAuth, AppRole } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: AppRole;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, roles, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requiredRole && !roles.includes(requiredRole)) {
    // Redirect based on what role they DO have
    if (roles.includes("admin")) return <Navigate to="/admin" replace />;
    if (roles.includes("organizer")) return <Navigate to="/dashboard" replace />;
    return <Navigate to="/attendee" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
