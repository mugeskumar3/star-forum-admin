import apiClient from "../Config/Index";
import ShowNotifications from "../helper/ShowNotifications";

class LoginApi {
  async login(credentials) {
    try {
      const response = await apiClient.post("/admin/auth/login", credentials);
      if (response.status === 200 || response.status === 201) {
        ShowNotifications.showAlertNotification(
          response.data.message || "Login successful!",
          true,
        );
        return { status: true, response: response.data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";
      ShowNotifications.showAlertNotification(errorMessage, false);
      return {
        status: false,
        response: error?.response?.data || error,
      };
    }
  }
}

export default new LoginApi();
