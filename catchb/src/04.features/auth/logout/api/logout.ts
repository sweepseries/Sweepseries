import axios from "axios";

import { getSecure } from "@shared/lib/storage";

export async function logout() {
  try {
    const refreshToken = await getSecure("refreshToken");

    await axios.post("/api/v1/logout/", {
      refresh: refreshToken,
    });

    return true;
  } catch {
    return false;
  }
}
