import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { isAxiosError, type AxiosError, type AxiosResponse } from "axios";
import styled from "styled-components";

import {
  type AdminCatchBFAQDetailType,
  useEditFAQ,
  useFAQForm,
} from "@entities/faqs";
import type { APIErrorResponse } from "@shared/api";
import { TextButton } from "@shared/ui/Buttons";

interface Props {
  faqId: number;
}

export function SaveFAQButton({ faqId }: Readonly<Props>) {
  const { question, answer, selectedCategory, resetForm } = useFAQForm();
  const { mutate: editFAQ } = useEditFAQ(faqId);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSubmitSuccess = (
    response: AxiosResponse<AdminCatchBFAQDetailType>
  ) => {
    resetForm();
    window.alert("FAQ가 성공적으로 수정되었습니다.");
    queryClient.setQueryData<AdminCatchBFAQDetailType>(
      ["faqDetails", response.data.id],
      () => response.data
    );
    queryClient.invalidateQueries({ queryKey: ["faqs"] });

    navigate(`/faqs/${response.data.id}`);
  };

  const onSubmitError = (error: AxiosError<APIErrorResponse>) => {
    if (isAxiosError(error) && error.response?.data?.error) {
      window.alert(`FAQ 수정에 실패했습니다: ${error.response.data.error}`);
    } else {
      window.alert("FAQ 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const save = async () => {
    if (!selectedCategory) {
      window.alert("카테고리를 선택해주세요.");
      return;
    }

    editFAQ(
      {
        question,
        answer,
        category_id: selectedCategory.id,
      },
      {
        onSuccess: onSubmitSuccess,
        onError: onSubmitError,
      }
    );
  };

  return (
    <Wrapper>
      <TextButton text="저장" onClick={save} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
