import "@testing-library/jest-dom";
import { vi } from "vitest";

import { type TabType } from "@shared/lib/navigation";

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
  const { tabs } = await vi.importActual("@shared/lib/navigation");

  return {
    tabs: tabs,
    SidebarTab: ({ tab, onClick }: { tab: TabType; onClick: () => void }) => (
      <button onClick={onClick}>{tab.title}</button>
    ),
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
vi.mock("@shared/ui/Dividers", () => ({
  Divider: () => null,
  VerticalDivider: () => null,
}));
vi.mock("@shared/ui/Inputs", () => ({
  Checkbox: ({
    label,
    checked,
    onToggle,
  }: {
    label: string;
    checked: boolean;
    onToggle: () => void;
  }) => (
    <label data-testid={`checkbox-${label}`}>
      <input type="checkbox" checked={checked} onChange={onToggle} />
      {label}
    </label>
  ),
  TextInput: ({
    label,
    value,
    onChange,
    placeholder,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  }) => (
    <input
      data-testid={`textinput-${label}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  ),
  TextArea: ({
    label,
    value,
    onChange,
    placeholder,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  }) => (
    <textarea
      data-testid={`textarea-${label}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  ),
}));
vi.mock("@shared/ui/Icons", () => ({
  AppIcon: () => null,
  Logo: () => <div>Mocked Logo</div>,
}));
