import styled from "styled-components";

export function InquiriesTableHeader() {
  return (
    <HeaderWrapper>
      <span>ID</span>
      <span>질문</span>
      <span>유저</span>
      <span>카테고리</span>
      <span>상태</span>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;

  font-size: 1.125rem;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.text700};

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
  }

  > span:first-child {
    width: 3rem;
  }

  > span:nth-child(2) {
    flex: 1;
    max-width: 24rem;
    border-left: 1px solid ${({ theme }) => theme.colors.gray700};
  }

  > span:nth-child(3) {
    width: 7rem;
    border-left: 1px solid ${({ theme }) => theme.colors.gray700};
  }

  > span:nth-child(4) {
    width: 5rem;
    border-left: 1px solid ${({ theme }) => theme.colors.gray700};
  }

  > span:nth-child(5) {
    width: 5rem;
    border-left: 1px solid ${({ theme }) => theme.colors.gray700};
  }
`;
