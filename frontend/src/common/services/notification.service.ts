import apiClient from "./apiClient";

export interface Notification {
  id: string;
  title: string;
  body?: string;
  data?: any;
  createdAt: string;
  read?: boolean;
}

const notificationService = {
  // Lấy danh sách thông báo (mặc định recent first)
  async getNotifications(
    params?: Record<string, any>,
  ): Promise<Notification[]> {
    const res = await apiClient.get("/notifications", { params });
    return res.data?.data || res.data || [];
  },

  // Đánh dấu tất cả đã đọc
  async markAllRead(): Promise<void> {
    await apiClient.patch("/notifications/mark-all-read");
  },

  // Đánh dấu 1 thông báo đã đọc
  async markRead(id: string): Promise<void> {
    await apiClient.patch(`/notifications/${id}/read`);
  },

  // Xóa thông báo
  async deleteNotification(id: string): Promise<void> {
    await apiClient.delete(`/notifications/${id}`);
  },

  // Tạo thông báo (dùng khi backend có endpoint tạo)
  async createNotification(payload: Partial<Notification>) {
    const res = await apiClient.post("/notifications", payload);
    return res.data;
  },
};

export default notificationService;
