import { formatTimeSince } from "../formatters/formatTimeSince";

describe("formatTimeSince", () => {
  const now = new Date("2025-01-01T00:00:00Z");

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(now);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should format simple mode correctly", () => {
    const testCases = [
      { date: new Date(now.getTime() - 5000), expected: "5초 전" },
      { date: new Date(now.getTime() - 120000), expected: "2분 전" },
      { date: new Date(now.getTime() - 3600000), expected: "1시간 전" },
      { date: new Date(now.getTime() - 86400000), expected: "1일 전" },
      { date: new Date(now.getTime() - 604800000), expected: "2024.12.25" },
      { date: new Date(now.getTime() - 31536000000), expected: "2024.01.02" },
    ];

    testCases.forEach(({ date, expected }) => {
      expect(formatTimeSince(date)).toBe(expected);
    });
  });

  it("should format full mode correctly", () => {
    const testCases = [
      { date: new Date(now.getTime() - 5000), expected: "5초 전" },
      { date: new Date(now.getTime() - 120000), expected: "2분 전" },
      { date: new Date(now.getTime() - 3600000), expected: "1시간 전" },
      { date: new Date(now.getTime() - 86400000), expected: "1일 전" },
      { date: new Date(now.getTime() - 2592000000), expected: "1개월 전" },
      { date: new Date(now.getTime() - 31536000000), expected: "1년 전" },
    ];

    testCases.forEach(({ date, expected }) => {
      expect(formatTimeSince(date, "full")).toBe(expected);
    });
  });
});
