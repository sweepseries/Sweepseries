import axios from "axios";

export const refresh = async () => {
  try {
    const response = await axios.post(`/v1/tokens/refresh/`, {});

    return response.data;
  } catch {
    return null;
  }
};
