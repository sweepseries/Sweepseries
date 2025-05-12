export type WithdrawReasonType = {
  id: number;
  reason: string;
};

export type WithdrawRequestData = {
  reason: number;
  reason_text: string;
  uuid: string;
};
