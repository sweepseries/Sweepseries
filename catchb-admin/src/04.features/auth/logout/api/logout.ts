import axios from "axios";

export const logout = async () => {
  try {
    await axios.post(`/v1/logout/`, {});

    return true;
  } catch {
    return null;
  }
};
