import "@testing-library/jest-dom";
import { vi } from "vitest";

import { type TabType } from "@shared/lib/navigation";

vi.mock("axios", async () => {
  const actual = await vi.importActual("axios");
  return {
    ...actual,
    isAxiosError: vi.fn().mockReturnValue(true),
  };
});
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

vi.mock("@widgets/layouts/modals", async () => {
  const { ModalInnerContainer, ModalContentHorizontal, ModalContentVertical } =
    await vi.importActual("@widgets/layouts/modals/");

  return {
    Modal: ({
      isOpen,
      onClose,
      children,
    }: {
      isOpen: boolean;
      onClose: () => void;
      children: React.ReactNode;
    }) => (
      <>
        {isOpen && (
          <div>
            <button onClick={onClose}>Close</button>
            {children}
          </div>
        )}
      </>
    ),
    ModalInnerContainer,
    ModalContentHorizontal,
    ModalContentVertical,
  };
});

vi.mock("@shared/lib/auth", async () => {
  const {
    AuthContext,
    sampleAdmin,
    sampleUserProfile,
    sampleAnonymousUserProfile,
    isAnonymousUser,
  } = await vi.importActual("@shared/lib/auth");

  return {
    useAuth: vi.fn(() => ({
      login: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: false,
    })),
    AuthContext: AuthContext,
    sampleAdmin: sampleAdmin,
    sampleUserProfile: sampleUserProfile,
    sampleAnonymousUserProfile: sampleAnonymousUserProfile,
    AuthProvider: ({ children }: { children: React.ReactNode }) => children,
    AnonymousUserProfile: () => null,
    ProfileImage: () => null,
    UserProfile: () => null,
    isAnonymousUser: isAnonymousUser,
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
  TextButton: ({ text, onClick }: { text: string; onClick: () => void }) => (
    <button onClick={onClick} data-testid={`text-button-${text}`}>
      {text}
    </button>
  ),
}));
vi.mock("@shared/ui/Chips", () => ({
  TextChip: ({ label }: { label: string }) => <span>{label}</span>,
}));
vi.mock("@shared/ui/Dividers", () => ({
  Divider: () => null,
  VerticalDivider: () => null,
}));
vi.mock("@shared/ui/Icons", () => ({
  AppIcon: () => null,
  Logo: () => <div>Mocked Logo</div>,
}));
vi.mock("@shared/ui/Inputs", async () => {
  const { defaultExtensions } = await vi.importActual("@shared/ui/Inputs");

  return {
    Checkbox: ({
      label,
      checked,
      onToggle,
    }: {
      label: string;
      checked: boolean;
      onToggle: () => void;
    }) => (
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          data-testid={`checkbox-${label}`}
        />
        {label}
      </label>
    ),
    EditorToolbar: () => <div>EditorToolbar</div>,
    EditorWrapper: ({ children }: { children: React.ReactNode }) => children,
    TextInput: ({
      label,
      value,
      onChange,
    }: {
      label: string;
      value: string;
      onChange: (value: string) => void;
    }) => (
      <input
        data-testid={`textinput-${label}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
    defaultExtensions,
  };
});
vi.mock("@shared/ui/Menus", () => {
  function DropdownMenu<T>({
    items,
    keyExtractor,
    renderItem,
    onItemClick,
  }: Readonly<{
    items: T[];
    keyExtractor: (item: T) => string;
    renderItem: (item: T) => React.ReactNode;
    onItemClick: (item: T) => void;
  }>) {
    return (
      <div>
        {items.map((item) => (
          <button
            key={keyExtractor(item)}
            onClick={() => onItemClick(item)}
            data-testid={`dropdown-item-${keyExtractor(item)}`}
          >
            {renderItem(item)}
          </button>
        ))}
      </div>
    );
  }
  return {
    DropdownMenu: DropdownMenu,
  };
});
vi.mock("@shared/ui/Texts", () => ({
  ModalSubtitle: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
}));
