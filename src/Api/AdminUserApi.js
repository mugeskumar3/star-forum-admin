import apiClient from "../Config/Index";
import ShowNotifications from "../helper/ShowNotifications";

class AdminUserApi {
  async getAdminUser(id, currentPage, rowsPerPage, search) {
    try {
      const url = id
        ? `/adminUser/${id}`
        : `/adminUser?page=${currentPage}&limit=${rowsPerPage}&search=${search || ""}`;
      const response = await apiClient.get(url);
      if (response.status === 200 || response.status === 201) {
        return { status: true, response: response.data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch admin user(s). Please try again.";
      ShowNotifications.showAlertNotification(errorMessage, false);
      return {
        status: false,
        response: error?.response?.data || error,
      };
    }
  }

  async createAdminUser(data) {
    try {
      const response = await apiClient.post("/adminUser", data);
      if (response.status === 200 || response.status === 201) {
        ShowNotifications.showAlertNotification(
          response.data.message || "Admin user created successfully!",
          true,
        );
        return { status: true, response: response.data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create admin user. Please try again.";
      ShowNotifications.showAlertNotification(errorMessage, false);
      return {
        status: false,
        response: error?.response?.data || error,
      };
    }
  }

  async updateAdminUser(data) {
    try {
      const response = await apiClient.put(`/adminUser/${data.id}`, data);
      if (response.status === 200 || response.status === 201) {
        ShowNotifications.showAlertNotification(
          response.data.message || "Admin user updated successfully!",
          true,
        );
        return { status: true, response: response.data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update admin user. Please try again.";
      ShowNotifications.showAlertNotification(errorMessage, false);
      return {
        status: false,
        response: error?.response?.data || error,
      };
    }
  }

  async deleteAdminUser(id) {
    try {
      const response = await apiClient.delete(`/adminUser/${id}`);
      if (response.status === 200 || response.status === 201) {
        ShowNotifications.showAlertNotification(
          response.data.message || "Admin user deleted successfully!",
          true,
        );
        return { status: true, response: response.data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete admin user. Please try again.";
      ShowNotifications.showAlertNotification(errorMessage, false);
      return {
        status: false,
        response: error?.response?.data || error,
      };
    }
  }
}

export default new AdminUserApi();
