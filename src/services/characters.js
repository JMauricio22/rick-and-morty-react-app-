import axiosInstance from "./config";

export const getAllCharacters = async () => {
  try {
    const resp = await axiosInstance.get("character");
    return resp.data.results;
  } catch (error) {
    throw error;
  }
};
