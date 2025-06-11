import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";

import {
  InquiryFormContext,
  InquiryFormContextType,
} from "../contexts/useInquiryForm";
import {
  InquiryCategoryType,
  InquiryThreadType,
  inquiryCategories,
  useCreateInquiry,
} from "@entities/inquiries";
import { ErrorResponse } from "@shared/api";
import { useAlert } from "@shared/lib/alert";
import { useAuth, UserProfileType } from "@shared/lib/auth";

export function InquiryFormProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [category, setCategory] = useState<InquiryCategoryType>(
    inquiryCategories[0]
  );
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isGuestMode, setIsGuestMode] = useState<boolean>(false);

  const { showAlert } = useAlert();
  const { user } = useAuth();
  const { mutate: createInquiry } = useCreateInquiry();
  const queryClient = useQueryClient();
  const scrollRef = useRef<ScrollView>(null);

  const openForm = () => {
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  const postSuccess = () => {
    setCategory(inquiryCategories[0]);
    setTitle("");
    setContent("");
    closeForm();
  };

  const submitError = (error: AxiosError<ErrorResponse>) => {
    if (isAxiosError(error) && error.response?.data?.error) {
      const errorMessage = error.response.data.error;
      showAlert({
        title: "등록 실패",
        message: errorMessage,
      });
    } else {
      showAlert({
        title: "등록 실패",
        message: "문의를 등록하는데 실패했습니다. 잠시 후 다시 시도해주세요.",
      });
    }
  };

  const submitFormAsAuthenticatedUser = (user: UserProfileType) => {
    createInquiry(
      {
        user: user.uuid,
        category: category.id,
        title: title,
        content: content,
      },
      {
        onSuccess: (res) => {
          postSuccess();
          queryClient.setQueryData<InquiryThreadType[]>(
            ["inquiries"],
            (old = []) => [res.data, ...old]
          );
        },
        onError: (error) => {
          submitError(error);
        },
      }
    );
  };

  const submitFormAsGuest = () => {
    createInquiry(
      {
        name: name,
        email: email,
        category: category.id,
        title: title,
        content: content,
      },
      {
        onSuccess: () => {
          postSuccess();
          showAlert({
            title: "등록 완료",
            message: "문의가 등록되었습니다. 답변을 기다려주세요.",
          });
        },
        onError: (error) => {
          submitError(error);
        },
      }
    );
  };

  const submitForm = async () => {
    if (!user) {
      submitFormAsGuest();
    } else {
      submitFormAsAuthenticatedUser(user);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsGuestMode(false);
    } else {
      setName("");
      setEmail("");
      setIsGuestMode(true);
    }
  }, [user]);

  const value = useMemo<InquiryFormContextType>(
    () => ({
      name,
      setName,
      email,
      setEmail,
      category,
      setCategory,
      title,
      setTitle,
      content,
      setContent,
      isOpen,
      isGuestMode,
      openForm,
      closeForm,
      submitForm,
      scrollRef,
    }),
    [name, email, category, title, content, isOpen, isGuestMode]
  );

  return (
    <InquiryFormContext.Provider value={value}>
      {children}
    </InquiryFormContext.Provider>
  );
}
