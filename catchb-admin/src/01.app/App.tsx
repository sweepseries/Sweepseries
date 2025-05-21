import { AuthProvider, ColorsProvider } from "./providers";
import { GlobalStyles } from "./styles";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <ColorsProvider>
        <AuthProvider>
          <div />
        </AuthProvider>
      </ColorsProvider>
    </>
  );
}
