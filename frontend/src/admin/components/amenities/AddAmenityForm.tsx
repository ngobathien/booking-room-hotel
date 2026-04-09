import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAmenitiesAction } from "../../../hooks/amenities/useAmenitiesAction";

export const AddAmenityForm = () => {
  const { addAmenity } = useAmenitiesAction();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await addAmenity(name.trim());
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
          Thêm tiện ích mới
        </h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên tiện ích"
          className="border border-gray-300 rounded-lg px-4 py-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
        />
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-500 text-white flex-1 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Thêm tiện ích
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
