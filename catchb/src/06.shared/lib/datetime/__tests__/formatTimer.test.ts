import { formatTimer } from "../formatters/formatTimer";

describe("formatTimer", () => {
  it("should format 0 seconds as 0:00", () => {
    expect(formatTimer(0)).toBe("0:00");
  });

  it("should format 30 seconds as 0:30", () => {
    expect(formatTimer(30)).toBe("0:30");
  });

  it("should format 90 seconds as 1:30", () => {
    expect(formatTimer(90)).toBe("1:30");
  });

  it("should format 120 seconds as 2:00", () => {
    expect(formatTimer(120)).toBe("2:00");
  });

  it("should format 3661 seconds as 61:01", () => {
    expect(formatTimer(3661)).toBe("61:01");
  });
});
