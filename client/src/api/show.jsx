import axiosInstance from ".";

export const addShow = async (values) => {
  try {
    const response = await axiosInstance.post("/api/shows/addShow", values);
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response?.data || { success: false, message: err.message };
  }
};

export const getAllShows = async () => {
  try {
    const response = await axiosInstance.get("/api/shows/getAllShows");
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response?.data || { success: false, message: err.message };
  }
};

export const getShowsByTheater = async (theaterId) => {
  try {
    const response = await axiosInstance.get(
      `/api/shows/getShowsByTheater/${theaterId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response?.data || { success: false, message: err.message };
  }
};

export const getAllTheatersByMovie = async (movie, date) => {
  try {
    const response = await axiosInstance.get(
      `/api/shows/getAllTheatersByMovie/${movie}/${date}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response?.data || { success: false, message: err.message };
  }
};

export const getShowById = async (showId) => {
  try {
    const response = await axiosInstance.get(
      `/api/shows/getShowById/${showId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response?.data || { success: false, message: err.message };
  }
};

export const updateShow = async (values) => {
  try {
    const response = await axiosInstance.put(
      `/api/shows/updateShow/${values.showId}`,
      values
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response?.data || { success: false, message: err.message };
  }
};

export const deleteShow = async (values) => {
  try {
    const response = await axiosInstance.delete(
      `/api/shows/deleteShow/${values.showId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response?.data || { success: false, message: err.message };
  }
};
