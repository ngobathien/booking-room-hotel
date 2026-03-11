import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm token vào request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // nhận mã 401 từ backend gửi về nếu token hết hạn,
      // Token không hợp lệ / user bị xóa
      localStorage.removeItem("token");

      // Optional: xóa user info nếu có
      localStorage.removeItem("user");

      // Redirect về login
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default apiClient;
