import { useState } from "react";
import { useAmenitiesAction } from "../../../hooks/amenities/useAmenitiesAction";
import { Link } from "react-router-dom";

export const ManageAmenitiesPage = () => {
  const { amenities, loading, removeAmenity } = useAmenitiesAction();

  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const renderIcon = (icon?: string) => {
    if (!icon) return <span className="text-gray-400">—</span>;

    if (icon.startsWith("http")) {
      return (
        <img
          src={icon}
          alt="icon"
          className="h-6 w-6 object-contain inline-block"
        />
      );
    }

    if (icon.startsWith("fa")) {
      return <i className={`${icon} text-lg`}></i>;
    }

    return <span className="text-gray-400">🔧</span>;
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const confirmDelete = () => {
    if (selectedId) {
      removeAmenity(selectedId);
    }
    setOpenModal(false);
    setSelectedId(null);
  };

  const cancelDelete = () => {
    setOpenModal(false);
    setSelectedId(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Danh sách tiện ích</h2>
        <Link
          to="create"
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Thêm tiện ích
        </Link>
      </div>

      {amenities.length === 0 ? (
        <p className="text-gray-500">Chưa có tiện ích nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-medium">
                  Tên tiện ích
                </th>
                <th className="px-6 py-3 text-left text-gray-700 font-medium">
                  Icon
                </th>
                <th className="px-6 py-3 text-center text-gray-700 font-medium">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {amenities.map((a) => (
                <tr key={a._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-700">{a.name}</td>

                  <td className="px-6 py-4 text-gray-700">
                    {renderIcon(a.icon)}
                  </td>

                  <td className="px-6 py-4 text-center space-x-4">
                    <Link
                      to={`edit/${a._id}`}
                      className="text-blue-500 hover:underline font-medium"
                    >
                      Sửa
                    </Link>

                    <button
                      onClick={() => handleDeleteClick(a._id)}
                      className="text-red-500 hover:underline font-medium"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Confirm */}
      {openModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={cancelDelete}
        >
          <div
            className="bg-white rounded-xl p-6 w-80 shadow-xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">
              Bạn có chắc muốn xóa?
            </h3>

            <p className="text-gray-500 mb-6">
              Hành động này không thể hoàn tác
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition"
              >
                Hủy
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
