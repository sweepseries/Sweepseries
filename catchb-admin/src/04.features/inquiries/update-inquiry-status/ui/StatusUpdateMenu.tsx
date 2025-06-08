import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  InquiryStatusChip,
  type InquiryStatusType,
  type InquiryThreadListResponseType,
  useUpdateInquiryStatus,
} from "@entities/inquiries";
import { DropdownMenu } from "@shared/ui/Menus";

interface Props {
  inquiryId:number;
  currentStatus: InquiryStatusType;
}

export function StatusUpdateMenu({ inquiryId, currentStatus }: Readonly<Props>) {
  const [statusOptions, setStatusOptions] = useState<InquiryStatusType[]>([]);
  const { mutate: updateStatus } = useUpdateInquiryStatus(inquiryId);
  const queryClient = useQueryClient();

  const onStatusClick = (status: InquiryStatusType) => {
    if (status.id === currentStatus.id) return;

    updateStatus(
      { status_id: status.id },
      {
        onError: () => {
          window.alert(
            "문의 상태를 변경하는 데 실패했습니다. 잠시 후 다시 시도해주세요."
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
      setStatusOptions(listData.status);
    }
  }, [queryClient]);

  return (
    <DropdownMenu
      items={statusOptions}
      selectedItem={currentStatus}
      renderItem={(status) => <InquiryStatusChip status={status} isActive />}
      keyExtractor={(status) => status.name}
      onItemClick={onStatusClick}
    />
  );
}
