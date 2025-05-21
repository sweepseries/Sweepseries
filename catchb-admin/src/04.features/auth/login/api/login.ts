import axios from "axios";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`/v1/login/`, {
      username: username,
      password: password,
    });

    return response.data;
  } catch {
    return null;
  }
};
