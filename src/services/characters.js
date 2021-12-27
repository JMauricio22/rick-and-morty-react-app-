import axiosInstance from "./config";

export const getAllCharacters = async (signal) => {
  try {
    const resp = await axiosInstance.get("character", { signal });
    return resp.data.results;
  } catch (error) {
    throw error;
  }
};

export const getCharacterById = async (id, signal) => {
  try {
    const resp = await axiosInstance.get(`character/${id}`, { signal });
    return resp.data;
  } catch (error) {
    throw error;
  }
};
