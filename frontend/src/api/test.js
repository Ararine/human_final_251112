import { api, apiWithCookie } from "./axios";

export const getTestById = async (testId) => {
  try {
    const response = await apiWithCookie.get(`/test/${testId}`);
    return response.data;
  } catch (error) {
    console.error("Get post by ID error:", error);
    throw error;
  }
};
