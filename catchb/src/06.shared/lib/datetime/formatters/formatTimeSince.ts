type FormatTimeMode = "simple" | "full";

const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

/**
 * 주어진 날짜로부터 경과한 시간을 포맷한다.
 * @param date - 기준 날짜
 * @param mode - 포맷 모드, "simple" 또는 "full"
 * @returns 경과한 시간을 포맷한 문자열
 */

export function formatTimeSince(
  date: Date,
  mode: FormatTimeMode = "simple"
): string {
  const now = Date.now();
  const past = date.getTime();
  const diffSeconds = Math.max(0, now - past) / 1000;

  if (mode === "simple") {
    if (diffSeconds < MINUTE) {
      const s = Math.floor(diffSeconds);
      return `${s}초 전`;
    }
    if (diffSeconds < HOUR) {
      const m = Math.floor(diffSeconds / MINUTE);
      return `${m}분 전`;
    }
    if (diffSeconds < DAY) {
      const h = Math.floor(diffSeconds / HOUR);
      return `${h}시간 전`;
    }
    if (diffSeconds < WEEK) {
      const d = Math.floor(diffSeconds / DAY);
      return `${d}일 전`;
    }
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  }

  // Full mode
  if (diffSeconds < MINUTE) {
    const s = Math.floor(diffSeconds);
    return `${s}초 전`;
  }
  if (diffSeconds < HOUR) {
    const m = Math.floor(diffSeconds / MINUTE);
    return `${m}분 전`;
  }
  if (diffSeconds < DAY) {
    const h = Math.floor(diffSeconds / HOUR);
    return `${h}시간 전`;
  }
  if (diffSeconds < MONTH) {
    const d = Math.floor(diffSeconds / DAY);
    return `${d}일 전`;
  }
  if (diffSeconds < YEAR) {
    const mo = Math.floor(diffSeconds / MONTH);
    return `${mo}개월 전`;
  }
  const y = Math.floor(diffSeconds / YEAR);
  return `${y}년 전`;
}
