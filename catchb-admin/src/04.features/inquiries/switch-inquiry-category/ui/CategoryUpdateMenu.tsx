import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  InquiryCategoryChip,
  type InquiryCategoryType,
  type InquiryThreadListResponseType,
  useUpdateInquiryCategory,
} from "@entities/inquiries";
import { DropdownMenu } from "@shared/ui/Menus";

interface Props {
  inquiryId: number;
  currentCategory: InquiryCategoryType;
}

export function CategoryUpdateMenu({
  inquiryId,
  currentCategory,
}: Readonly<Props>) {
  const [categoryOptions, setCategoryOptions] = useState<InquiryCategoryType[]>(
    []
  );
  const { mutate: updateCategory } = useUpdateInquiryCategory(inquiryId);
  const queryClient = useQueryClient();

  const onCategoryClick = (category: InquiryCategoryType) => {
    if (category.id === currentCategory.id) return;

    updateCategory(
      { category_id: category.id },
      {
        onError: () => {
          window.alert(
            "문의 분류를 변경하는 데 실패했습니다. 잠시 후 다시 시도해주세요."
          );
        },
      }
    );
  };

  useEffect(() => {
    const listData = queryClient.getQueryData<InquiryThreadListResponseType>([
      "inquiries",
    ]);

    if (listData) {
      setCategoryOptions(listData.categories);
    }
  }, [queryClient]);

  return (
    <DropdownMenu
      items={categoryOptions}
      selectedItem={currentCategory}
      renderItem={(category) => (
        <InquiryCategoryChip category={category} isActive />
      )}
      keyExtractor={(category) => category.name}
      onItemClick={onCategoryClick}
    />
  );
}
