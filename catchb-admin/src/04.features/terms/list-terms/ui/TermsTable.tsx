import { useNavigate } from "react-router";
import styled from "styled-components";

import { useTermsList } from "../hooks/useTermsList";
import { TermListHeaderRow, TermListRow } from "@entities/terms";

export function TermsTable() {
  const { terms } = useTermsList();
  const navigate = useNavigate();

  const openDetailModal = (termId: number) => {
    navigate(`/terms/${termId}`);
  };

  return (
    <Table>
      <TermListHeaderRow />
      {terms.map((term) => (
        <button
          key={term.id}
          onClick={() => openDetailModal(term.id)}
          data-testid={`term-${term.id}`}
        >
          <TermListRow term={term} />
        </button>
      ))}
    </Table>
  );
}

const Table = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`;
