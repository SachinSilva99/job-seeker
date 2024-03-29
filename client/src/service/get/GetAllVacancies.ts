import apiClient from "../ApiClient.ts";

export const getAllVacancies = async (page: number, size: number) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await apiClient.get(
      `/vacancy?page=${page}&szie=${size}`,
      {headers}
    );
    console.log('log', response)
    return response.data.data;
  } catch (error) {
    throw error.response.data.msg;
  }
}
