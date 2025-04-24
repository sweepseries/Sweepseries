import axios from "axios";

export async function getTerms() {
  try {
    const response = await axios.get("/v1/terms/");

    return response.data;
  } catch {
    return null;
  }
}

export async function getTermsDetail(id: string) {
  try {
    const response = await axios.get(`/v1/terms/${id}/`);

    return response.data;
  } catch {
    return null;
  }
}
