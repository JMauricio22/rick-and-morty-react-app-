import axiosInstance from "./config";

export const getAllCharacters = async (signal, url = "character") => {
  try {
    const resp = await axiosInstance(
      {
        url,
      },
      { signal }
    );
    const data = resp.data.results;
    const info = resp.data.info;
    console.log({ data, info });
    return {
      data,
      info,
    };
  } catch (error) {
    console.log(error);
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
