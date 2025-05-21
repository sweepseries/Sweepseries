import { useAuth } from "@shared/lib/auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { LoginPage } from "@pages/login";

export function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
