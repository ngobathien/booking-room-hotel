import { Link } from "react-router";

import LoadingSkeleton from "../LoadingSkeleton";
import { useAuth } from "../../hooks/auth/useAuth";

const ProfilePage = () => {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
              {user.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div>
              <h1 className="text-2xl font-semibold">{user.fullName}</h1>
              <p className="text-sm opacity-90">{user.email}</p>

              {/* Role badge */}
              <span
                className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full
                ${user.role === "ADMIN" ? "bg-red-500/90" : "bg-green-500/90"}`}
              >
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <InfoRow label="Email" value={user.email} />
          <InfoRow
            label="Số điện thoại"
            value={user.phone_number || "Chưa cập nhật"}
          />
          <InfoRow label="Vai trò" value={user.role} />
          <InfoRow
            label="Trạng thái"
            value={user.status === "ACTIVE" ? "Hoạt động" : "Bị khóa"}
            badge
            active={user.status === "ACTIVE"}
          />
        </div>

        {/* nút sửa thông tin */}

        <Link
          to="/change-password"
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          Đổi mật khẩu
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;

/* ======================== Component phụ ======================== */

const InfoRow = ({
  label,
  value,
  badge = false,
  active = false,
}: {
  label: string;
  value: string;
  badge?: boolean;
  active?: boolean;
}) => {
  return (
    <div className="flex justify-between items-center border-b last:border-b-0 pb-3">
      <span className="text-sm font-medium text-gray-600">{label}</span>

      {badge ? (
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium
            ${
              active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
        >
          {value}
        </span>
      ) : (
        <span className="text-sm text-gray-900">{value}</span>
      )}
    </div>
  );
};
