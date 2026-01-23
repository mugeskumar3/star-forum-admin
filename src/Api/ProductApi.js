import apiClient from "../Config/Index";
import ShowNotifications from "../helper/ShowNotifications";

class ProductApi {
    async createProduct(data) {
        try {
            const response = await apiClient.post(`/admin/products/create`, data);
            if (response.status === 200 || response.status === 201) {
                ShowNotifications.showAlertNotification(
                    response.data.message || "Product created successfully!",
                    true
                );
                return { status: true, data: response.data };
            }
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to create product.";
            ShowNotifications.showAlertNotification(errorMessage, false);
            return { status: false, error: errorMessage };
        }
    }

    async getProducts() {
        try {
            const response = await apiClient.get(`/admin/products/list`);
            if (response.status === 200) {
                return { status: true, data: response.data };
            }
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch products.";
            console.error(errorMessage);
            return { status: false, error: errorMessage };
        }
    }

    async getProductDetails(id) {
        try {
            const response = await apiClient.get(`/admin/products/details/${id}`);
            if (response.status === 200) {
                return { status: true, data: response.data };
            }
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch product details.";
            ShowNotifications.showAlertNotification(errorMessage, false);
            return { status: false, error: errorMessage };
        }
    }

    async updateProduct(id, data) {
        try {
            const response = await apiClient.put(`/admin/products/edit/${id}`, data);
            if (response.status === 200) {
                ShowNotifications.showAlertNotification(
                    response.data.message || "Product updated successfully!",
                    true
                );
                return { status: true, data: response.data };
            }
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update product.";
            ShowNotifications.showAlertNotification(errorMessage, false);
            return { status: false, error: errorMessage };
        }
    }

    async deleteProduct(id) {
        try {
            const response = await apiClient.delete(`/admin/products/delete/${id}`);
            if (response.status === 200) {
                ShowNotifications.showAlertNotification(
                    response.data.message || "Product deleted successfully!",
                    true
                );
                return { status: true, data: response.data };
            }
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to delete product.";
            ShowNotifications.showAlertNotification(errorMessage, false);
            return { status: false, error: errorMessage };
        }
    }
}

export default new ProductApi();
