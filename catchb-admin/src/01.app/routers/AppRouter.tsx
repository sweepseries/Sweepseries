import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { LoginPage } from "@pages/login";
import { TermsContainer } from "@pages/terms";
import { NotFoundPage } from "@widgets/fallback/notfound";
import { RootLayout } from "@widgets/layouts/root";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route element={<RootLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="terms/*" element={<TermsContainer />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
