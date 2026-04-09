import { useAmenitiesAction } from "../../../hooks/amenities/useAmenitiesAction";
import { Link } from "react-router-dom";

export const ManageAmenitiesPage = () => {
  const { amenities, loading, removeAmenity } = useAmenitiesAction();

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
                <th className="px-6 py-3 text-center text-gray-700 font-medium">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {amenities.map((a) => (
                <tr key={a._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-700">{a.name}</td>
                  <td className="px-6 py-4 text-center space-x-4">
                    <Link
                      to={`edit/${a._id}`}
                      className="text-blue-500 hover:underline font-medium"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => removeAmenity(a._id)}
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
    </div>
  );
};
