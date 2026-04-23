import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import apiClient from "../../common/services/apiClient";
import notificationService, {
  type Notification,
} from "../../common/services/notification.service";

function timeAgo(dateStr: string) {
  const d = new Date(dateStr);
  const diff = Date.now() - d.getTime();
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec} giây trước`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} phút trước`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} giờ trước`;
  const day = Math.floor(hr / 24);
  return `${day} ngày trước`;
}

const iconFor = (type?: string) => {
  if (type === "paid") return { icon: "✔", color: "text-green-600" };
  if (type === "unpaid") return { icon: "⚠", color: "text-red-600" };
  return { icon: "🔔", color: "text-slate-600" };
};

const NotificationsCard: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalItems, setTotalItems] = useState<number | null>(null);

  const fetchPage = async (p: number) => {
    setLoading(true);
    try {
      const res = await apiClient.get("/notifications", {
        params: { page: p, limit },
      });
      const payload = res.data || {};
      const list = payload.data || payload;
      const pagination = payload.pagination || null;

      const normalized = (list || []).map((it: any) => ({
        id: it.id || it._id || String(it._id || it.id || Date.now()),
        title: it.title,
        body: it.body,
        data: it.data,
        createdAt: it.createdAt || it.created_at || new Date().toISOString(),
        read: !!it.read,
        type: it.type,
      }));

      if (p === 1) setNotifications(normalized);
      else setNotifications((prev) => [...prev, ...normalized]);

      if (pagination) {
        setTotalItems(pagination.totalItems || 0);
        setHasMore(p * limit < (pagination.totalItems || 0));
      } else {
        setHasMore(!(list && list.length < limit));
      }
    } catch (err) {
      console.debug("fetch notifications failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(1);

    // setup socket for realtime updates
    const rawBase = import.meta.env.VITE_API_URL || "http://localhost:3000";
    let origin: string;
    try {
      origin = new URL(rawBase).origin;
    } catch (e) {
      origin = rawBase;
    }

    const socket = io(`${origin}/notifications`, {
      path: "/socket.io",
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.debug("notifications card socket connected", socket.id);
    });

    socket.on("newBooking", (payload: any) => {
      const id =
        payload._id || payload.id || payload.bookingId || String(Date.now());
      const title =
        payload.title ||
        (payload.type === "paid"
          ? "Thanh toán thành công"
          : payload.type === "unpaid"
            ? "Chưa thanh toán"
            : "Có đơn mới");
      const body =
        payload.body ||
        (payload.bookingCode
          ? `Mã: ${payload.bookingCode}`
          : payload.data?.bookingCode || "");
      const createdAt = payload.createdAt || new Date().toISOString();
      const note: Notification = {
        id,
        title,
        body,
        data: payload.data || payload,
        createdAt,
        read: false,
      };

      setNotifications((prev) => {
        if (prev.find((p) => p.id === note.id)) return prev;
        return [note, ...prev];
      });
    });

    socket.on("disconnect", () => {
      console.debug("notifications card socket disconnected");
    });

    return () => {
      try {
        socket.disconnect();
      } catch (e) {}
    };
  }, []);

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchPage(next);
  };

  const handleDelete = async (id: string) => {
    try {
      await notificationService.deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      if (totalItems !== null) setTotalItems((t) => (t ? t - 1 : t));
    } catch (err) {
      console.debug("delete notification failed", err);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg">🔔 Thông báo</h3>
        <div className="text-sm text-slate-600">
          {notifications.length} thông báo
        </div>
      </div>

      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="text-sm text-slate-500">Chưa có thông báo</div>
        ) : (
          notifications
            .slice(0, limit * page)
            .sort((a, b) => {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            })
            .map((n) => {
              const type = (n as any).type || n.data?.type;
              const ico = iconFor(type);
              return (
                <div
                  key={n.id}
                  className="p-3 border border-gray-200 rounded-lg flex items-start gap-3"
                >
                  <div className={`text-xl mt-0.5 ${ico.color}`}>
                    {ico.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-sm">{n.title}</div>
                      <div className="flex items-center gap-2">
                        <div className="text-[11px] text-slate-400">
                          {timeAgo(n.createdAt)}
                        </div>
                        <button
                          onClick={() => handleDelete(n.id)}
                          className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 mt-1">{n.body}</div>
                  </div>
                </div>
              );
            })
        )}
      </div>

      {hasMore && (
        <div className="mt-3 text-center">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="text-sm px-3 py-1 bg-slate-100 rounded-full border"
          >
            {loading ? "Đang tải..." : "Xem thêm"}
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsCard;
