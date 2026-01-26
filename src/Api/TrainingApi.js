import apiClient from "../Config/Index";
import ShowNotifications from "../helper/ShowNotifications";

class TrainingApi {
  async createTraining(data) {
    try {
      const response = await apiClient.post("training", data);
      if (response.status === 200 || response.status === 201) {
        ShowNotifications.showAlertNotification(
          response.data.message || "Training created successfully!",
          true,
        );
        return { status: true, response: response.data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create training. Please try again.";
      ShowNotifications.showAlertNotification(errorMessage, false);
      return {
        status: false,
        response: error?.response?.data || error,
      };
    }
  }

  async getTraining(params = {}) {
    try {
      const url = params.id ? `training/${params.id}` : "training";
      const config = {
        params: {
          page: params.page,
          limit: params.limit,
          search: params.search,
        },
      };

      const response = await apiClient.get(url, config);
      if (response.status === 200 || response.status === 201) {
        return { status: true, response: response.data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to get training data. Please try again.";
      ShowNotifications.showAlertNotification(errorMessage, false);
      return {
        status: false,
        response: error?.response?.data || error,
      };
    }
  }

  async updateTraining(data) {
    try {
      const response = await apiClient.put(`training/${data.id}`, data);
      if (response.status === 200 || response.status === 201) {
        ShowNotifications.showAlertNotification(
          response.data.message || "Training updated successfully!",
          true,
        );
        return { status: true, response: response.data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update training. Please try again.";
      ShowNotifications.showAlertNotification(errorMessage, false);
      return {
        status: false,
        response: error?.response?.data || error,
      };
    }
  }

  async deleteTraining(id) {
    try {
      const response = await apiClient.delete(`training/${id}`);
      if (response.status === 200 || response.status === 201) {
        ShowNotifications.showAlertNotification(
          response.data.message || "Training deleted successfully!",
          true,
        );
        return { status: true, response: response.data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete training. Please try again.";
      ShowNotifications.showAlertNotification(errorMessage, false);
      return {
        status: false,
        response: error?.response?.data || error,
      };
    }
  }
}

export default new TrainingApi();
