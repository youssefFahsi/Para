import { showToast, showToastNotif } from "@/components/notif";

export const handleApiResponse = (res, router) => {
    if (res.response) {
      if (res.response.status === 401) {
        showToastNotif("error", res.response.data.message, "Error:");
        router.push("/Login");
      }
      showToast("error", res.response.data.message, "Error:");
    } else if (res.request) {
      showToast("error", "Request Error", "Error:");
    } else {
      showToast("error", res, "Error:");
    }
  };