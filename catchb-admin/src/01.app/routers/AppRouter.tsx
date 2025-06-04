import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { AnnouncementsContainer } from "@pages/announcements";
import { FAQsContainer } from "@pages/faqs";
import { InquiriesContainer } from "@pages/inquiries";
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
          <Route path="announcements/*" element={<AnnouncementsContainer />} />
          <Route path="faqs/*" element={<FAQsContainer />} />
          <Route path="inquiries/*" element={<InquiriesContainer />} />
          <Route path="terms/*" element={<TermsContainer />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
