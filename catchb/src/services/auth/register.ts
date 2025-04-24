import axios from "axios";

import { RegisterDataType } from "@models/auth";

export async function checkUsernameEmail(username: string, email: string) {
  try {
    await axios.post("/v1/check-username-email/", {
      username,
      email,
    });

    return {
      status: 204,
      data: null,
    };
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }

    return {
      status: 400,
      data: "오류가 발생했습니다.",
    };
  }
}

export async function checkPassword(password: string, password2: string) {
  try {
    await axios.post("/v1/check-password/", {
      password,
      password2,
    });

    return {
      status: 204,
      data: null,
    };
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }

    return {
      status: 400,
      data: "오류가 발생했습니다.",
    };
  }
}

export async function requestCode(phone: string) {
  try {
    await axios.post("/v1/phone/code/", {
      phone,
    });

    return {
      status: 204,
      data: null,
    };
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }

    return {
      status: 400,
      data: "오류가 발생했습니다.",
    };
  }
}

export async function verifyCode(phone: string, code: string) {
  try {
    await axios.post("/v1/phone/code/verify/", {
      phone,
      code,
    });

    return {
      status: 204,
      data: null,
    };
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }

    return {
      status: 400,
      data: "오류가 발생했습니다.",
    };
  }
}

export async function register(data: RegisterDataType) {
  try {
    await axios.post("/v1/register/", data);

    return {
      status: 201,
      data: "SUCCESS",
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }

    return {
      status: 400,
      data: "오류가 발생했습니다.",
    };
  }
}
