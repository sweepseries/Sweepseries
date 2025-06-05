import styled from "styled-components";

import { useInquiriesList } from "../hooks/useInquiriesList";
import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";
import { SubTab, SubTabContainer } from "@shared/ui/Tabs";

export function InquiriesHeader() {
  const { mode, setMode } = useInquiriesList();
  const { colors } = useColors();

  return (
    <Wrapper>
      <SubTabContainer>
        <SubtabWithIcon
          onClick={() => setMode("상태별")}
          $isActive={mode === "상태별"}
          data-testid="상태별-tab"
        >
          <AppIcon
            icon="status"
            size={16}
            color={mode === "상태별" ? colors.primary : colors.gray900}
          />
          상태별
        </SubtabWithIcon>
        <SubtabWithIcon
          onClick={() => setMode("분류별")}
          $isActive={mode === "분류별"}
          data-testid="분류별-tab"
        >
          <AppIcon
            icon="category"
            size={16}
            color={mode === "분류별" ? colors.primary : colors.gray900}
          />
          분류별
        </SubtabWithIcon>
      </SubTabContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

const SubtabWithIcon = styled(SubTab)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
`;
