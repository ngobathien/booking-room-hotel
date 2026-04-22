import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAmenitiesAction } from "../../../hooks/amenities/useAmenitiesAction";

const EditAmenityForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { amenities, editAmenity } = useAmenitiesAction();

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const renderIcon = (icon?: string) => {
    if (!icon) return null;

    if (icon.startsWith("http")) {
      return <img src={icon} className="h-6 w-6 object-contain" />;
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

  useEffect(() => {
    const amenity = amenities.find((a) => a._id === id);
    if (amenity) {
      setName(amenity.name);
      setIcon((amenity as any).icon || "");
    }
  }, [amenities, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await editAmenity(id!, name.trim(), icon.trim() || undefined);
    navigate("/dashboard/amenities");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <button
        type="button"
        onClick={() => navigate("/dashboard/amenities")}
        className="mb-4 flex items-center space-x-2 text-blue-500"
      >
        ← Quay lại
      </button>

      <form
        className="bg-white shadow-lg rounded-xl p-8"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">Chỉnh sửa tiện ích</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-4 py-3 w-full mb-4 rounded-lg"
        />

        <input
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="border px-4 py-2 w-full mb-2 rounded-lg"
        />

        {/* 🔥 Preview */}
        {icon && (
          <div className="mb-4 flex items-center space-x-2">
            <span className="text-sm text-gray-500">Preview:</span>
            {renderIcon(icon)}
          </div>
        )}

        <div className="flex space-x-4">
          <button className="bg-yellow-500 text-white flex-1 py-3 rounded-lg">
            Lưu
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-300 flex-1 py-3 rounded-lg"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAmenityForm;
