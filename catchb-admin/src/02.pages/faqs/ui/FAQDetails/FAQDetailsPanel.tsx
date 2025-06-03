import styled from "styled-components";

import { LoadingTitleAndContentModal } from "@widgets/fallback/loading";
import {
  ModalInnerContainer,
  ModalContentVertical,
} from "@widgets/layouts/modals";
import { DeleteFAQButton } from "@features/faqs/delete-faq";
import {
  FAQAnswer,
  FAQDetailsProvider,
  FAQQuestion,
  useFAQDetails,
} from "@features/faqs/faq-details";
import { ReactivateFAQButton } from "@features/faqs/reactivate-faq";
import { useColors } from "@shared/lib/colors";
import { Divider } from "@shared/ui/Dividers";

export function FAQDetailsPanel() {
  return (
    <FAQDetailsProvider>
      <Components />
    </FAQDetailsProvider>
  );
}

function Components() {
  const { faqDetails, isLoading } = useFAQDetails();
  const { colors } = useColors();

  if (isLoading) {
    return <LoadingTitleAndContentModal />;
  }

  if (!faqDetails) return null;

  return (
    <ModalInnerContainer>
      <Wrapper>
        <Header>
          <FAQQuestion faq={faqDetails} />
          {faqDetails.is_active ? (
            <div>
              <DeleteFAQButton faqId={faqDetails.id} />
            </div>
          ) : (
            <div>
              <ReactivateFAQButton faqId={faqDetails.id} />
            </div>
          )}
        </Header>
        <Divider color={colors.gray700} />
        <FAQAnswer faq={faqDetails} />
      </Wrapper>
    </ModalInnerContainer>
  );
}

const Wrapper = styled(ModalContentVertical)`
  padding: 0 1.25rem;
  gap: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;
