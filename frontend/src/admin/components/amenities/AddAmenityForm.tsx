import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAmenitiesAction } from "../../../hooks/amenities/useAmenitiesAction";

export const AddAmenityForm = () => {
  const { addAmenity } = useAmenitiesAction();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const navigate = useNavigate();

  const renderIcon = (icon?: string) => {
    if (!icon) return null;

    if (icon.startsWith("http")) {
      return <img src={icon} className="h-6 w-6 object-contain inline-block" />;
    }

    if (
      icon.startsWith("fa") ||
      icon.startsWith("bi") ||
      icon.startsWith("ri")
    ) {
      return <i className={`${icon} text-lg`}></i>;
    }

    return <span>🔧</span>;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await addAmenity(name.trim(), icon.trim() || undefined);
    navigate("/dashboard/amenities");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
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
        className="bg-white shadow-lg rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Thêm tiện ích mới
        </h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên tiện ích"
          className="border border-gray-300 rounded-lg px-4 py-3 w-full mb-4"
        />

        <input
          type="text"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="Icon (url / fa / wifi...)"
          className="border border-gray-200 rounded-lg px-4 py-2 w-full mb-2 text-sm"
        />

        {/* 🔥 Preview */}
        {icon && (
          <div className="mb-4 flex items-center space-x-2">
            <span className="text-sm text-gray-500">Preview:</span>
            {renderIcon(icon)}
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-500 text-white flex-1 py-3 rounded-lg font-semibold hover:bg-green-600"
          >
            Thêm tiện ích
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-gray-700 flex-1 py-3 rounded-lg"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};
