import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAmenitiesAction } from "../../../hooks/amenities/useAmenitiesAction";

const EditAmenityForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { amenities, editAmenity } = useAmenitiesAction();
  const [name, setName] = useState("");

  useEffect(() => {
    const amenity = amenities.find((a) => a._id === id);
    if (amenity) setName(amenity.name);
  }, [amenities, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await editAmenity(id!, name.trim());
    navigate("/dashboard/amenities");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      {/* Nút Quay lại góc trái */}
      <button
        type="button"
        onClick={() => navigate("/dashboard/amenities")}
        className="mb-4 flex items-center space-x-2 text-blue-500 hover:text-blue-700 font-medium"
      >
        <span className="text-lg">←</span>
        <span>Quay lại</span>
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 transition-transform hover:scale-105"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Chỉnh sửa tiện ích
        </h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên tiện ích"
          className="border border-gray-300 rounded-lg px-4 py-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
        />
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-yellow-500 text-white flex-1 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            Lưu thay đổi
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-gray-700 flex-1 py-3 rounded-lg hover:bg-gray-400 transition"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAmenityForm;
