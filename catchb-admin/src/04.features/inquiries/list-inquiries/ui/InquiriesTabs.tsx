import styled from "styled-components";

import { useInquiriesList } from "../hooks/useInquiriesList";
import { InquiryCategoryChip, InquiryStatusChip } from "@entities/inquiries";

export function InquiriesTabs() {
  const {
    mode,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    categoryOptions,
    statusOptions,
  } = useInquiriesList();

  if (mode === "상태별" && statusOptions.length > 0) {
    return (
      <Wrapper>
        {statusOptions.map((status) => (
          <button
            key={status.id}
            onClick={() => setSelectedStatus(status)}
            data-testid={`${status.name}-tab`}
          >
            <InquiryStatusChip
              status={status}
              isActive={selectedStatus?.id === status.id}
            />
          </button>
        ))}
      </Wrapper>
    );
  }

  if (mode === "분류별" && categoryOptions.length > 0) {
    return (
      <Wrapper>
        {categoryOptions.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category)}
            data-testid={`${category.name}-tab`}
          >
            <InquiryCategoryChip
              category={category}
              isActive={selectedCategory?.id === category.id}
            />
          </button>
        ))}
      </Wrapper>
    );
  }

  return null;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.25rem;
  gap: 8px;
`;
