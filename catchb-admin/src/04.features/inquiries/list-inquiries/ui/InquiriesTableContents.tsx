import { useNavigate } from "react-router";
import styled from "styled-components";

import { useInquiriesList } from "../hooks/useInquiriesList";
import { InquirySimple } from "@entities/inquiries";

export function InquiriesTableContents() {
  const { inquiries } = useInquiriesList();
  const navigate = useNavigate();

  if (!inquiries || inquiries.length === 0) {
    return <Empty>문의가 없습니다.</Empty>;
  }

  const goToDetailPage = (id: number) => {
    navigate(`/inquiries/${id}`);
  };

  return (
    <List>
      {inquiries.map((inquiry) => (
        <button key={inquiry.id} onClick={() => goToDetailPage(inquiry.id)} data-testid={`inquiry-${inquiry.id}`}>
          <InquirySimple inquiry={inquiry} />
        </button>
      ))}
    </List>
  );
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 32px;
`;

const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text900};
`;


