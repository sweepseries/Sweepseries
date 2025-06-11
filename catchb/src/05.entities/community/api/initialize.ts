import axios from "axios";

import { CommunityInitializerResponseType } from "../models/types";

export async function initializeCommunity(): Promise<CommunityInitializerResponseType | null> {
  try {
    const response = await axios.get("/v1/community/initialize/");

    return response.data;
  } catch {
    return null;
  }
}
