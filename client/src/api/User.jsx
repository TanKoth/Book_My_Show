import axiosInstance from ".";

export const RegisterUser = async (value) => {
  try {
    const response = await axiosInstance.post("/api/users/register", value);
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response?.data || { success: false, message: err.message };
  }
};
export const LoginUser = async (value) => {
  try {
    const response = await axiosInstance.post("/api/users/login", value);
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response?.data || { success: false, message: err.message };
  }
};