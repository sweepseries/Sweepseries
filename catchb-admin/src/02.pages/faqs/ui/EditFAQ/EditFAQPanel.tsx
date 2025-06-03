import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

import {
  ModalInnerContainer,
  ModalContentVertical,
} from "@widgets/layouts/modals";
import { ModalTitle } from "@widgets/layouts/title";
import { SaveFAQButton } from "@features/faqs/edit-faq";
import {
  FAQForm,
  FAQFormProvider,
  useFAQForm,
  type AdminCatchBFAQDetailType,
} from "@entities/faqs";

export function EditFAQPanel() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id || isNaN(Number(id))) {
    window.alert("오류가 발생했습니다. 다시 시도해주세요.");
    navigate("/faqs");
    return null;
  }

  return (
    <FAQFormProvider>
      <Components id={Number(id)} />
    </FAQFormProvider>
  );
}

interface Props {
  id: number;
}

function Components({ id }: Readonly<Props>) {
  const queryClient = useQueryClient();
  const { setQuestion, setAnswer, setSelectedCategory } = useFAQForm();

  useEffect(() => {
    // get data from queryClient
    const existingData = queryClient.getQueryData<AdminCatchBFAQDetailType>([
      `faqDetails`,
      id,
    ]);

    if (existingData) {
      setQuestion(existingData.question);
      setAnswer(existingData.answer);
      setSelectedCategory(existingData.category);
    }
  }, [queryClient, id, setQuestion, setAnswer, setSelectedCategory]);

  return (
    <ModalInnerContainer>
      <ModalTitle>FAQ 수정</ModalTitle>
      <ModalContentVertical>
        <FAQForm />
        <SaveFAQButton faqId={id} />
      </ModalContentVertical>
    </ModalInnerContainer>
  );
}
