import axios from "axios";

import { getSecure } from "@services/storage";

export async function logout() {
  try {
    const refreshToken = await getSecure("refreshToken");

    await axios.post("/v1/logout/", {
      refresh: refreshToken,
    });

    return true;
  } catch {
    return false;
  }
}
