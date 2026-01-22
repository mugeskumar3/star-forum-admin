import apiClient from "../Config/Index";
import ShowNotifications from "../helper/ShowNotifications";

class RegionApi {
  async createRegion(data) {
    try {
      const response = await apiClient.post("/admin/region", data);
      if (response.status === 200 || response.status === 201) {
        ShowNotifications.showAlertNotification(
          response.data.message || "Region created successfully!",
          true,
        );
        return { status: true, response: response.data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create region. Please try again.";
      ShowNotifications.showAlertNotification(errorMessage, false);
      return {
        status: false,
        response: error?.response?.data || error,
      };
    }
  }
  async getRegion() {
    try {
      const response = await apiClient.get("/admin/region");
      if (response.status === 200 || response.status === 201) {
        return { status: true, response: response.data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to get region. Please try again.";
      ShowNotifications.showAlertNotification(errorMessage, false);
      return {
        status: false,
        response: error?.response?.data || error,
      };
    }
  }
  async updateRegion(data) {
    try {
      const response = await apiClient.put(`/admin/region/${data.id}`, data);
      if (response.status === 200 || response.status === 201) {
        ShowNotifications.showAlertNotification(
          response.data.message || "Region updated successfully!",
          true,
        );
        return { status: true, response: response.data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update region. Please try again.";
      ShowNotifications.showAlertNotification(errorMessage, false);
      return {
        status: false,
        response: error?.response?.data || error,
      };
    }
  }
  async deleteRegion(id) {
    try {
      const response = await apiClient.delete(`/admin/region/${id}`);
      if (response.status === 200 || response.status === 201) {
        ShowNotifications.showAlertNotification(
          response.data.message || "Region deleted successfully!",
          true,
        );
        return { status: true, response: response.data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete region. Please try again.";
      ShowNotifications.showAlertNotification(errorMessage, false);
      return {
        status: false,
        response: error?.response?.data || error,
      };
    }
  }
}

export default new RegionApi();
