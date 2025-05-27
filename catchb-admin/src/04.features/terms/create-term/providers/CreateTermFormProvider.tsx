import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { isAxiosError, type AxiosError, type AxiosResponse } from "axios";

import {
  CreateTermContext,
  type CreateTermContextType,
} from "../models/context";
import {
  type AdminTermsAndConditionsType,
  useCreateTerm,
} from "@entities/terms";
import type { APIErrorResponse } from "@shared/api";

export function CreateTermProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isRequired, setIsRequired] = useState<boolean>(false);

  const toggleIsRequired = () => setIsRequired((prev) => !prev);

  const { mutate: createTerm } = useCreateTerm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSubmitSuccess = (
    response: AxiosResponse<AdminTermsAndConditionsType>
  ) => {
    setTitle("");
    setContent("");
    setIsRequired(false);
    window.alert("약관이 성공적으로 생성되었습니다.");
    queryClient.setQueryData<AdminTermsAndConditionsType[]>(
      ["terms"],
      (old) => {
        if (!old) return [response.data];
        return [...old, response.data].sort((a, b) => a.order - b.order);
      }
    );

    const newTermId = response.data.id;

    navigate(`/terms/${newTermId}`);
  };

  const onSubmitError = (error: AxiosError<APIErrorResponse>) => {
    if (isAxiosError(error) && error.response?.data?.error) {
      window.alert(`약관 생성에 실패했습니다: ${error.response.data.error}`);
    } else {
      window.alert("약관 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const submitForm = () => {
    createTerm(
      {
        title,
        content,
        is_required: isRequired,
      },
      {
        onSuccess: onSubmitSuccess,
        onError: onSubmitError,
      }
    );
  };

  const value = useMemo<CreateTermContextType>(
    () => ({
      title,
      setTitle,
      content,
      setContent,
      isRequired,
      toggleIsRequired,
      submit: submitForm,
    }),
    [title, setTitle, content, setContent, isRequired, toggleIsRequired]
  );

  return (
    <CreateTermContext.Provider value={value}>
      {children}
    </CreateTermContext.Provider>
  );
}
