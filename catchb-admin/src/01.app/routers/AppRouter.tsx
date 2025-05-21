import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { LoginPage } from "@pages/login";
import { NotFoundPage } from "@widgets/fallback/notfound";
import { RootLayout } from "@widgets/layouts/root";
import { useAuth } from "@shared/lib/auth";

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
        <Route element={<RootLayout />}>
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
