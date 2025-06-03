import { useNavigate } from "react-router";
import styled from "styled-components";

import { AddButton } from "@shared/ui/Tabs";

export function NavigateToCreateFAQButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/faqs/create");
  };

  return (
    <Button onClick={handleClick} data-testid="new-faq">
      새 FAQ 추가
    </Button>
  );
}

const Button = styled(AddButton)`
  padding: 0.25rem 0.75rem;
  border-radius: 0.33rem;
  font-weight: 500;
`;
