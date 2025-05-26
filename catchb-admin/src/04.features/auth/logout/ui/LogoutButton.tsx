import { useNavigate } from "react-router";
import styled from "styled-components";

import { logout as logoutRequest } from "../api/logout";
import { useAuth } from "@shared/lib/auth";
import { useColors } from "@shared/lib/colors";
import { SidebarButton } from "@shared/ui/Buttons";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  isSidebarOpen: boolean;
}

export function LogoutButton({ isSidebarOpen }: Readonly<Props>) {
  const { logout } = useAuth();
  const { colors } = useColors();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logoutRequest();

    if (response) {
      logout();
      navigate("/login");
    } else {
      window.alert(
        "로그아웃 시도 시 서버와 통신에 실패했습니다. 다시 시도해주세요."
      );
    }
  };

  return (
    <Button onClick={handleLogout}>
      <AppIcon icon="logout" size={16} color={colors.gray100} />
      {isSidebarOpen && <span>로그아웃</span>}
    </Button>
  );
}

const Button = styled(SidebarButton)`
  gap: 8px;
  color: ${({ theme }) => theme.colors.gray100};
  &:hover {
    background-color: #ff4d4d;
  }
`;
