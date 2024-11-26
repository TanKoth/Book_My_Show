import axiosInstance from ".";

export const createShow = async (showData) => {
  try {
    const response = await axiosInstance.post(
      "/api/shows/createShow",
      showData
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
};

export const updateShow = async (showId) => {
  try {
    const response = await axiosInstance.put(`/api/shows/updateShow/${showId}`);
    console.log("updateShow :", response);
    return response.data;
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

export const getShowsBytheater = async (payload) => {
  try {
    const response = await axiosInstance.get(
      `/api/shows/getShowsByTheater/${payload.theaterId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

export const deleteShow = async (payload) => {
  try {
    const response = await axiosInstance.delete(
      `/api/shows/deleteShow/${payload.showId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

export const getAlltheatersByMovie = async (movieId, date) => {
  try {
    const response = await axiosInstance.get(
      `/api/shows/getAllTheatersByMovie/${movieId}/${date}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

export const getShowById = async (payload) => {
  try {
    const response = await axiosInstance.get(
      `/api/shows/getShowById/${payload.showId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.message;
  }
};
