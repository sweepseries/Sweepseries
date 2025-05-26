import { Route, Routes } from "react-router";

import { TermsManagementLayout } from "./_layout";
import { CreateTermPanel } from "./CreateTerm/CreateTermPanel";
import { TermsDetailPanel } from "./TermsDetail/TermsDetailPanel";

export function TermsContainer() {
  return (
    <Routes>
      <Route element={<TermsManagementLayout />}>
        <Route index element={null} />
        <Route path="create" element={<CreateTermPanel />} />
        <Route path=":id" element={<TermsDetailPanel />} />
      </Route>
    </Routes>
  );
}
