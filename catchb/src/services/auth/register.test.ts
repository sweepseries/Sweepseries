import axios from "axios";
import { waitFor } from "@testing-library/react-native";

import {
  checkUsernameEmail,
  checkPassword,
  requestCode,
  verifyCode,
  register,
} from "./register";
import { sampleRegisterData } from "@testdata/auth";

describe("checkUsernameEmail", () => {
  it("should successfully check username and email", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({
      status: 204,
    });

    const response = await waitFor(() =>
      checkUsernameEmail("username", "email")
    );

    expect(response.status).toBe(204);
  });

  it("should handle username already taken", async () => {
    jest.spyOn(axios, "isAxiosError").mockReturnValueOnce(true);
    jest.spyOn(axios, "post").mockImplementation(() => {
      throw {
        response: {
          status: 400,
          data: "Username already taken",
        },
      };
    });

    const response = await waitFor(() =>
      checkUsernameEmail("username", "email")
    );

    expect(response.status).toBe(400);
    expect(response.data).toBe("Username already taken");
  });

  it("should handle server error", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(null);

    const response = await waitFor(() =>
      checkUsernameEmail("username", "email")
    );

    expect(response.status).toBe(400);
  });
});

describe("checkPassword", () => {
  it("should successfully check password", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({
      status: 204,
    });

    const response = await waitFor(() => checkPassword("password", "password"));

    expect(response.status).toBe(204);
  });

  it("should handle invalid password", async () => {
    jest.spyOn(axios, "isAxiosError").mockReturnValueOnce(true);
    jest.spyOn(axios, "post").mockImplementation(() => {
      throw {
        response: {
          status: 400,
          data: "Invalid password",
        },
      };
    });

    const response = await waitFor(() => checkPassword("password", "password"));

    expect(response.status).toBe(400);
    expect(response.data).toBe("Invalid password");
  });

  it("should handle server error", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(null);

    const response = await waitFor(() => checkPassword("password", "password"));

    expect(response.status).toBe(400);
  });
});

describe("requestCode", () => {
  it("should successfully request code", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({
      status: 204,
    });

    const response = await waitFor(() => requestCode("phone"));

    expect(response.status).toBe(204);
  });

  it("should handle invalid phone number", async () => {
    jest.spyOn(axios, "isAxiosError").mockReturnValueOnce(true);
    jest.spyOn(axios, "post").mockImplementation(() => {
      throw {
        response: {
          status: 400,
          data: "Invalid phone number",
        },
      };
    });

    const response = await waitFor(() => requestCode("phone"));

    expect(response.status).toBe(400);
    expect(response.data).toBe("Invalid phone number");
  });

  it("should handle server error", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(null);

    const response = await waitFor(() => requestCode("phone"));

    expect(response.status).toBe(400);
  });
});

describe("verifyCode", () => {
  it("should successfully verify code", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({
      status: 204,
    });

    const response = await waitFor(() => verifyCode("phone", "code"));

    expect(response.status).toBe(204);
  });

  it("should handle invalid code", async () => {
    jest.spyOn(axios, "isAxiosError").mockReturnValueOnce(true);
    jest.spyOn(axios, "post").mockImplementation(() => {
      throw {
        response: {
          status: 400,
          data: "Invalid code",
        },
      };
    });

    const response = await waitFor(() => verifyCode("phone", "code"));

    expect(response.status).toBe(400);
    expect(response.data).toBe("Invalid code");
  });

  it("should handle server error", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(null);

    const response = await waitFor(() => verifyCode("phone", "code"));

    expect(response.status).toBe(400);
  });
});

describe("register", () => {
  it("should successfully register", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({
      status: 200,
      data: "Registered",
    });

    const response = await waitFor(() =>
      register(sampleRegisterData)
    );

    expect(response.status).toBe(201);
    expect(response.data).toBe("SUCCESS");
  });

  it("should handle invalid data", async () => {
    jest.spyOn(axios, "isAxiosError").mockReturnValueOnce(true);
    jest.spyOn(axios, "post").mockImplementation(() => {
      throw {
        response: {
          status: 400,
          data: "Invalid data",
        },
      };
    });

    const response = await waitFor(() =>
      register(sampleRegisterData)
    );

    expect(response.status).toBe(400);
    expect(response.data).toBe("Invalid data");
  });

  it("should handle server error", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(null);

    const response = await waitFor(() => register(sampleRegisterData));

    expect(response.status).toBe(400);
    expect(response.data).toBe("오류가 발생했습니다.");
  });
});
