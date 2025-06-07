import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ProfileName = styled.div`
  font-size: 0.925rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text500};
`;
