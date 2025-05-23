import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");

  return {
    ...actual,
    Outlet: () => <div>Mocked Outlet</div>,
    useNavigate: () => vi.fn(),
    useLocation: vi.fn(),
    useParams: vi.fn(),
  };
});

vi.mock("@shared/lib/auth", async () => {
  const { AuthContext } = await vi.importActual("@shared/lib/auth");

  return {
    AuthProvider: ({ children }: { children: React.ReactNode }) => children,
    useAuth: vi.fn(() => ({
      login: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: false,
    })),
    AuthContext: AuthContext,
  };
});
vi.mock("@shared/lib/colors", async () => {
  const { ColorContext, ThemeColorType, light } = await vi.importActual(
    "@shared/lib/colors"
  );

  return {
    useColors: vi.fn(() => ({
      colors: light,
      toggleTheme: vi.fn(),
    })),
    ColorContext: ColorContext,
    ColorsProvider: ({ children }: { children: React.ReactNode }) => children,
    ThemeColorType: ThemeColorType,
    light: light,
    dark: light,
  };
});
vi.mock("@shared/lib/navigation", async () => {
  const { TabType, tabs } = await vi.importActual("@shared/lib/navigation");

  return {
    tabs: tabs,
    TabType: TabType,
    SidebarTab: ({
      title,
      onClick,
    }: {
      title: string;
      onClick: () => void;
    }) => <button onClick={onClick}>{title}</button>,
  };
});

vi.mock("@shared/ui/Buttons", () => ({
  SidebarButton: ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: React.ReactNode;
  }) => <button onClick={onClick}>{children}</button>,
}));
vi.mock("@shared/ui/Icons", () => ({
  AppIcon: () => null,
  Logo: () => <div>Mocked Logo</div>,
}));
