import { Outlet, Navigate } from "react-router-dom";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const signedIn = false;

  if (!signedIn && isPrivate) {
    return <Navigate to="/login" />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
