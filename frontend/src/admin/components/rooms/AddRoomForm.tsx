import React, { useState } from "react";
import * as ReactRouterDom from "react-router-dom";
import { toast } from "react-toastify";
import useRoomAction from "../../../hooks/room/useRoomAction";
import AddUploadImages from "./AddUploadImages";
import { useRoomTypesAction } from "../../../hooks/roomTypes/useRoomTypesAction";
import { useAmenitiesAction } from "../../../hooks/amenities/useAmenitiesAction";
import { useRoomAmenities } from "../../../hooks/roomAmenities/useRoomAmenities";
import { useHotel } from "../../../hooks/hotel/useHotel";

const { useNavigate } = ReactRouterDom;

interface RoomFormData {
  roomNumber: string;
  roomTypeId: string;
  status: "AVAILABLE" | "MAINTENANCE";
  thumbnail?: string;
  description: string;
  amenityIds: string[];
  // hotelId: string;
}

const AddRoomForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { hotel, loading: _hotelLoading } = useHotel();

  const [formData, setFormData] = useState<RoomFormData>({
    roomNumber: "",
    roomTypeId: "",
    status: "AVAILABLE",
    thumbnail: "",
    description: "",
    amenityIds: [],
    // hotelId: "",
  });

  const { handleCreateNewRoom } = useRoomAction();
  const { amenities } = useAmenitiesAction();
  const { assignAmenities } = useRoomAmenities();
  const { roomTypes } = useRoomTypesAction();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!hotel?._id) {
      toast.error("Chưa load được khách sạn");
      return;
    }
    try {
      setLoading(true);

      const createdRoom = await handleCreateNewRoom(
        {
          roomNumber: formData.roomNumber,
          // hotelId: "65b8f300a1d9c8e1a9999999",
          hotelId: hotel._id,
          roomType: formData.roomTypeId,
          status: formData.status,
          thumbnail: formData.thumbnail,
          description: formData.description,
        },
        selectedFiles,
      );

      if (formData.amenityIds.length > 0) {
        await assignAmenities(createdRoom._id, formData.amenityIds);
      }

      toast.success("Thêm phòng thành công");
      navigate("/dashboard/rooms");
    } catch (error) {
      console.error(error);
      toast.error("Thêm phòng thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard/rooms")}
          className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-blue-600 rounded-xl transition"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <div>
          <h1 className="text-3xl font-black text-slate-900">Thêm Phòng mới</h1>
          <p className="text-slate-400 text-xs uppercase mt-1">
            Quản lý chi tiết từng phòng
          </p>
        </div>
      </div>

      {hotel && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
          {/* Hotel name */}
          <div>
            <p className="text-xs text-slate-400 uppercase">Khách sạn</p>
            <p className="font-bold text-slate-800">{hotel.name}</p>
          </div>

          {/* Hotel ID */}
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase">Hotel ID</p>
            <p className="font-mono text-sm text-slate-600">{hotel._id}</p>
          </div>
        </div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-10 shadow-xl space-y-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            {/* Room Number */}
            <div>
              <label className="label">Số phòng *</label>
              <input
                type="text"
                className="input"
                placeholder="VD: 405"
                value={formData.roomNumber}
                onChange={(e) =>
                  setFormData({ ...formData, roomNumber: e.target.value })
                }
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="label">Trạng thái</label>
              <select
                className="input"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as any })
                }
              >
                <option value="AVAILABLE">Có sẵn</option>
                {/* <option value="BOOKED">Đã đặt</option> */}
                {/* <option value="OCCUPIED">Đang ở</option> */}
                <option value="MAINTENANCE">Bảo trì</option>
              </select>
            </div>

            {/* Room Type */}
            <div>
              <label className="label">Loại phòng</label>
              <select
                className="input"
                value={formData.roomTypeId}
                onChange={(e) =>
                  setFormData({ ...formData, roomTypeId: e.target.value })
                }
              >
                <option value="">-- Chọn loại phòng --</option>
                {roomTypes.map((rt) => (
                  <option key={rt._id} value={rt._id}>
                    {rt.typeName} - {rt.pricePerNight.toLocaleString()}đ
                  </option>
                ))}
              </select>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="label">Ảnh đại diện</label>
              <input
                type="text"
                className="input"
                placeholder="https://..."
                value={formData.thumbnail}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    thumbnail: e.target.value,
                  })
                }
              />
            </div>

            {/* Upload Images */}
            <AddUploadImages
              files={selectedFiles}
              setFiles={setSelectedFiles}
              max={4}
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            {/* Amenities */}
            <div>
              <label className="label">Tiện ích</label>

              <div className="grid grid-cols-2 gap-3">
                {amenities.map((a) => {
                  const checked = formData.amenityIds.includes(a._id);

                  return (
                    <label
                      key={a._id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition border
                        ${
                          checked
                            ? "bg-blue-50 border-blue-200"
                            : "bg-white hover:bg-slate-50 border-slate-200"
                        }`}
                    >
                      <input
                        type="checkbox"
                        value={a._id}
                        checked={checked}
                        onChange={(e) => {
                          const id = e.target.value;
                          setFormData((prev) => {
                            const current = prev.amenityIds;
                            if (e.target.checked) {
                              return {
                                ...prev,
                                amenityIds: [...current, id],
                              };
                            } else {
                              return {
                                ...prev,
                                amenityIds: current.filter((x) => x !== id),
                              };
                            }
                          });
                        }}
                        className="hidden"
                      />

                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border
                          ${
                            checked
                              ? "bg-blue-600 border-blue-600 text-white"
                              : "border-slate-300"
                          }`}
                      >
                        {checked && (
                          <span className="material-symbols-outlined text-sm">
                            check
                          </span>
                        )}
                      </div>

                      <span className="text-sm font-semibold text-slate-700">
                        {a.name}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="label">Mô tả</label>
              <textarea
                className="input min-h-[120px]"
                placeholder="VD: View biển..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary"
          >
            Hủy
          </button>

          {/* <button type="submit" disabled={loading} className="btn-primary"> */}
          <button
            type="submit"
            disabled={loading || !hotel?._id}
            className="btn-primary"
          >
            {loading ? "Đang thêm..." : "Thêm phòng"}
          </button>
        </div>
      </form>

      {/* Tailwind reusable classes */}
      <style>
        {`
        .label {
          display: block;
          font-size: 10px;
          font-weight: 800;
          color: #94a3b8;
          margin-bottom: 6px;
          text-transform: uppercase;
        }

        .input {
          width: 100%;
          height: 48px;
          padding: 0 16px;
          border-radius: 14px;
          background: #f8fafc;
          outline: none;
          transition: 0.2s;
        }

        .input:focus {
          background: white;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
        }

        textarea.input {
          padding: 12px 16px;
          height: auto;
        }

        .btn-primary {
          background: #2563eb;
          color: white;
          padding: 0 20px;
          height: 44px;
          border-radius: 12px;
          font-weight: 700;
        }

        .btn-secondary {
          background: #f1f5f9;
          padding: 0 20px;
          height: 44px;
          border-radius: 12px;
          font-weight: 700;
        }
        `}
      </style>
    </div>
  );
};

export default AddRoomForm;
