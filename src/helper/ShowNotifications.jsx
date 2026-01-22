import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ShowNotifications {
  static showAlertNotification(message, isSuccess = true) {
    const options = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background:"#ffffff",
        color: isSuccess ? "#C4161C" : "#C4161C",
        fontWeight: "500",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(196, 22, 28, 0.3)",
      },
      progressStyle: {
        background: "rgba(255, 255, 255, 1)",
      },
    };

    if (isSuccess) {
      toast.success(message, options);
    } else {
      toast.error(message, options);
    }
  }

  static showNotification(message, type = "info") {
    const baseStyle = {
      background: "#ffffff",
      color: "#C4161C",
      fontWeight: "500",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(196, 22, 28, 0.3)",
    };

    const options = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: baseStyle,
      progressStyle: {
        background: "rgba(255, 255, 255, 0.7)",
      },
    };

    switch (type) {
      case "success":
        toast.success(message, options);
        break;
      case "error":
        options.style.background = "#dc3545";
        toast.error(message, options);
        break;
      case "warning":
        options.style.background = "#ffc107";
        options.style.color = "#000000";
        toast.warning(message, options);
        break;
      case "info":
        options.style.background = "#0dcaf0";
        toast.info(message, options);
        break;
      default:
        toast(message, options);
    }
  }
}

export default ShowNotifications;
