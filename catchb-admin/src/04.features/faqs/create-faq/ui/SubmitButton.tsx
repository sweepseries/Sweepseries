import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { isAxiosError, type AxiosError, type AxiosResponse } from "axios";
import styled from "styled-components";

import {
  useCreateFAQ,
  useFAQForm,
  type AdminCatchBFAQDetailType,
} from "@entities/faqs";
import type { APIErrorResponse } from "@shared/api";
import { TextButton } from "@shared/ui/Buttons";

export function SubmitNewFAQButton() {
  const { question, answer, selectedCategory, resetForm } = useFAQForm();
  const { mutate: createFAQ } = useCreateFAQ();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSubmitSuccess = (
    response: AxiosResponse<AdminCatchBFAQDetailType>
  ) => {
    resetForm();
    window.alert("FAQ가 성공적으로 생성되었습니다.");
    queryClient.invalidateQueries({ queryKey: ["faqs"] });
    queryClient.setQueryData<AdminCatchBFAQDetailType>(
      ["faqDetails", response.data.id],
      response.data
    );

    navigate(`/faqs/${response.data.id}`);
  };

  const onSubmitError = (error: AxiosError<APIErrorResponse>) => {
    if (isAxiosError(error) && error.response?.data?.error) {
      window.alert(`FAQ 생성에 실패했습니다: ${error.response.data.error}`);
    } else {
      window.alert("FAQ 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const submit = async () => {
    if (selectedCategory === null) {
      window.alert("카테고리를 선택해주세요.");
      return;
    }
    createFAQ(
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
      <TextButton text="등록" onClick={submit} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
