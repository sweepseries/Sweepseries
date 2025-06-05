import type { UserProfileType, AnonymousUserType } from "../models/types";

export function isAnonymousUser(
  user: UserProfileType | AnonymousUserType
): user is AnonymousUserType {
  // uuid가 없으면 익명 사용자로 간주
  return !("uuid" in user) || user.uuid === "";
}
