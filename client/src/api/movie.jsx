import axiosInstance from ".";

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/api/movies/getAllMovies");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const addMovie = async (values) => {
  try {
    const response = await axiosInstance.post("/api/movies/addMovie", values);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateMovie = async (values) => {
  try {
    const response = await axiosInstance.put(
      "/api/movies/updateMovie/" + values.movieId,
      values
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteMovie = async (values) => {
  try {
    const response = await axiosInstance.delete(
      "/api/movies/deleteMovie/" + values.movieId,
      values
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getMovieById = async (movieId) => {
  try {
    const response = await axiosInstance.get(
      `/api/movies/getMovieById/${movieId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
};
