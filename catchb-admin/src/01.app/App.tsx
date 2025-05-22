import { AuthProvider, AutoLoginProvider, ColorsProvider } from "./providers";
import { AppRouter } from "./routers";
import { GlobalStyles } from "./styles";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <ColorsProvider>
        <AuthProvider>
          <AutoLoginProvider>
            <AppRouter />
          </AutoLoginProvider>
        </AuthProvider>
      </ColorsProvider>
    </>
  );
}
