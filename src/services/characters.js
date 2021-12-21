import axiosInstance from "./config";

export const getAllCharacters = async () => {
  try {
    const resp = await axiosInstance.get("character");
    return resp.data;
  } catch (error) {
    throw error;
  }
};
