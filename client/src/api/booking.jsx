import axiosInstance from ".";

export const bookShow = async (values) => {
  try {
    const response = await axiosInstance.post("/api/bookings/bookShow", values);
    return response.data;
  } catch (err) {
    return err?.response?.data || { success: false, message: err.message };
  }
};

export const makePayment = async (paymentData) => {
  try {
    const response = await axiosInstance.post(
      "/api/bookings/makePayment",
      paymentData
    );
    return response.data;
  } catch (err) {
    return err?.response?.data || { success: false, message: err.message };
  }
};

export const getAllBookings = async (payload) => {
  try {
    const response = await axiosInstance.get(
      `/api/bookings/getAllBookings/${payload.userId}`
    );
    return response.data;
  } catch (err) {
    return err?.response?.data || { success: false, message: err.message };
  }
};
