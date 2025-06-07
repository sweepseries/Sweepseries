import { beforeEach, describe, expect, it, vi } from "vitest";

import { formatTimeSince } from "@shared/lib/datetime";

describe("formatTimeSince", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-01T00:00:00Z"));
  });

  it("should return correct outputs every time", () => {
    const testCases = [
      { input: new Date("2024-12-31T23:59:55Z"), expected: "5 초 전" },
      { input: new Date("2024-12-31T23:58:00Z"), expected: "2 분 전" },
      { input: new Date("2024-12-31T10:00:00Z"), expected: "14 시간 전" },
      { input: new Date("2024-12-30T00:00:00Z"), expected: "2 일 전" },
      { input: new Date("2024-10-30T00:00:00Z"), expected: "2 개월 전" },
      { input: new Date("2023-01-01T00:00:00Z"), expected: "2 년 전" },
    ];

    testCases.forEach(({ input, expected }) => {
      const result = formatTimeSince(input);
      expect(result).toBe(expected);
    });
  });
});
