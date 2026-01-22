import apiClient from "../Config/Index";
import ShowNotifications from "../helper/ShowNotifications";

class BusinessCategoryApi {
  async createBusinessCategory(data) {
    try {
      const response = await apiClient.post("/admin/business-category", data);
      if (response.status === 200 || response.status === 201) {
        ShowNotifications.showAlertNotification(
          response.data.message || "Business Category created successfully!",
          true,
        );
        return { status: true, response: response.data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create business category. Please try again.";
      ShowNotifications.showAlertNotification(errorMessage, false);
      return {
        status: false,
        response: error?.response?.data || error,
      };
    }
  }
  async getBusinessCategory(id) {
    try {
      const url = id
        ? `/admin/business-category/${id}`
        : "/admin/business-category";
      const response = await apiClient.get(url);
      if (response.status === 200 || response.status === 201) {
        return { status: true, response: response.data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to get business category. Please try again.";
      ShowNotifications.showAlertNotification(errorMessage, false);
      return {
        status: false,
        response: error?.response?.data || error,
      };
    }
  }
  async updateBusinessCategory(id, data) {
    try {
      const response = await apiClient.put(
        `/admin/business-category/${id}`,
        data,
      );
      if (response.status === 200 || response.status === 201) {
        ShowNotifications.showAlertNotification(
          response.data.message || "Business Category updated successfully!",
          true,
        );
        return { status: true, response: response.data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update business category. Please try again.";
      ShowNotifications.showAlertNotification(errorMessage, false);
      return {
        status: false,
        response: error?.response?.data || error,
      };
    }
  }
  async deleteBusinessCategory(id) {
    try {
      const response = await apiClient.delete(`/admin/business-category/${id}`);
      if (response.status === 200 || response.status === 201) {
        ShowNotifications.showAlertNotification(
          response.data.message || "Business Category deleted successfully!",
          true,
        );
        return { status: true, response: response.data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete business category. Please try again.";
      ShowNotifications.showAlertNotification(errorMessage, false);
      return {
        status: false,
        response: error?.response?.data || error,
      };
    }
  }
}

export default new BusinessCategoryApi();
