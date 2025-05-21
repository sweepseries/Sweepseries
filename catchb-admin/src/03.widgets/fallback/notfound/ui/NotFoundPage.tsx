import { useNavigate } from "react-router";
import styled from "styled-components";

export function NotFoundPage() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <h6>존재하지 않는 페이지입니다.</h6>
      <BackButton onClick={goBack}>뒤로가기</BackButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};

  z-index: 1000;
`;

const BackButton = styled.button`
  padding: 8px 16px;
  color: ${({ theme }) => theme.colors.background100};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background900};
  }
`;
