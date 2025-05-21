import { useNavigate } from "react-router";
import styled from "styled-components";

import { logout as logoutRequest } from "../api/logout";
import { useAuth } from "@shared/lib/auth";
import { SidebarButton } from "@shared/ui/Buttons";

export function LogoutButton() {
  const { logout } = useAuth();
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

  return <Button onClick={handleLogout}>로그아웃</Button>;
}

const Button = styled(SidebarButton)`
  &:hover {
    background-color: #ff4d4d;
  }
`;
