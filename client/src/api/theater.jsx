import axiosInstance from ".";

export const addTheater = async (values) => {
  try {
    const response = await axiosInstance.post(
      "/api/theaters/addTheater",
      values
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response?.data || { success: false, message: err.message };
  }
};

export const getAllTheatersforAdmin = async () => {
  try {
    const response = await axiosInstance.get("/api/theaters/getTheaters");
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response?.data || { success: false, message: err.message };
  }
};

export const getAllTheatres = async (ownerId) => {
  try {
    const response = await axiosInstance.get(
      `/api/theaters/get-all-theaters-by-owner/${ownerId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response?.data || { success: false, message: err.message };
  }
};

export const updateTheater = async (values) => {
  try {
    const response = await axiosInstance.put(
      "/api/theaters/updateTheater/" + values.theaterId,
      values
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response?.data || { success: false, message: err.message };
  }
};

export const deleteTheater = async (values) => {
  try {
    const response = await axiosInstance.delete(
      `/api/theaters/deleteTheater/${values.theaterId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response?.data || { success: false, message: err.message };
  }
};
