import React, { useEffect, useState } from "react";
import * as ReactRouterDom from "react-router-dom";
import { toast } from "react-toastify";

import useRoomAction from "../../../hooks/room/useRoomAction";
import EditUploadImages from "./EditUploadImages";
import { useRoomTypesAction } from "../../../hooks/roomTypes/useRoomTypesAction";
import { useAmenitiesAction } from "../../../hooks/amenities/useAmenitiesAction";
import { useRoomAmenities } from "../../../hooks/roomAmenities/useRoomAmenities";

const { useParams, useNavigate } = ReactRouterDom;

interface RoomFormData {
  roomNumber: string;
  roomTypeId: string;
  status: "AVAILABLE" | "MAINTENANCE";
  thumbnail?: string;
  description: string;
}

// 🔥 Hàm bổ trợ để lấy ID từ chuỗi "new ObjectId('...')" của dữ liệu cũ
const parseAmenityId = (item: any): string => {
  if (typeof item === "string" && item.includes("new ObjectId")) {
    const match = item.match(/'([^']+)'/);
    return match ? match[1] : item;
  }
  return item?._id || item;
};

const EditRoomForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { roomTypes } = useRoomTypesAction();
  const { getRoomWithAmenitiesById, handleUpdateRoom } = useRoomAction();

  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const { amenities } = useAmenitiesAction(); // Lấy danh sách tất cả tiện ích hệ thống
  const { assignAmenities } = useRoomAmenities();

  const [amenityIds, setAmenityIds] = useState<string[]>([]);
  const [formData, setFormData] = useState<RoomFormData>({
    roomNumber: "",
    roomTypeId: "",
    status: "AVAILABLE",
    thumbnail: "",
    description: "",
  });

  // 🔥 LOAD DATA CŨ VÀ SET TRẠNG THÁI CHECKBOX
  useEffect(() => {
    if (!id) return;

    const fetchRoom = async () => {
      try {
        setLoadingPage(true);
        const room = await getRoomWithAmenitiesById(id);

        // set form data cơ bản
        setFormData({
          roomNumber: room.roomNumber ?? "",
          roomTypeId: room.roomType?._id ?? "",
          status: room.status ?? "AVAILABLE",
          thumbnail: room.thumbnail ?? "",
          description: room.description ?? "",
        });

        setExistingImages(room.images ?? []);

        // 🔥 Xử lý tiện ích để "tick" sẵn ô checkbox
        if (room.amenities && Array.isArray(room.amenities)) {
          const ids = room.amenities.map((item: any) => parseAmenityId(item));
          setAmenityIds(ids);
        }
      } catch {
        toast.error("Không tải được dữ liệu phòng");
      } finally {
        setLoadingPage(false);
      }
    };

    fetchRoom();
  }, [id]);

  // 🔁 UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || loadingSubmit) return;

    try {
      setLoadingSubmit(true);

      // 1. Cập nhật thông tin phòng & hình ảnh
      await handleUpdateRoom(
        id,
        {
          roomNumber: formData.roomNumber,
          roomType: formData.roomTypeId,
          status: formData.status,
          thumbnail: formData.thumbnail,
          description: formData.description,
          images: existingImages,
        },
        selectedFiles,
      );

      // 2. Cập nhật danh sách tiện ích đã chọn
      await assignAmenities(id, amenityIds);

      toast.success("Cập nhật phòng thành công");
      navigate("/dashboard/rooms");
    } catch {
      toast.error("Cập nhật phòng thất bại");
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loadingPage) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-black text-slate-400 animate-pulse uppercase tracking-widest text-xs">
          Đang tải dữ liệu phòng...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard/rooms")}
          className="group p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-100 rounded-xl transition-all shadow-sm"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
        </button>

        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Chỉnh sửa Phòng
          </h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
            Cập nhật thông tin phòng và tiện ích
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-[2.5rem] border border-slate-200 p-8 sm:p-12 shadow-2xl shadow-slate-200/50 space-y-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {/* Số phòng */}
          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
              Số phòng <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-5 h-14 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white transition-all font-bold"
              value={formData.roomNumber}
              onChange={(e) =>
                setFormData({ ...formData, roomNumber: e.target.value })
              }
              required
            />
          </div>

          {/* Trạng thái */}
          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
              Trạng thái hiện tại
            </label>
            <select
              className="w-full px-5 h-14 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white transition-all font-bold"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as any })
              }
            >
              <option value="AVAILABLE">Sẵn sàng (Trống)</option>
              <option value="BOOKED">Đã đặt</option>
              <option value="OCCUPIED">Đang ở</option>
              <option value="MAINTENANCE">Bảo trì</option>
            </select>
          </div>

          {/* Loại phòng */}
          <div className="md:col-span-2 group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
              Loại phòng
            </label>
            <select
              className="w-full px-5 h-14 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white transition-all font-bold"
              value={formData.roomTypeId}
              onChange={(e) =>
                setFormData({ ...formData, roomTypeId: e.target.value })
              }
            >
              <option value="">-- Chọn loại phòng --</option>
              {roomTypes.map((rt) => (
                <option key={rt._id} value={rt._id}>
                  {rt.typeName} - {rt.pricePerNight.toLocaleString()}đ/đêm
                </option>
              ))}
            </select>
          </div>

          {/* Thumbnail */}
          <div className="md:col-span-2 group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
              Ảnh đại diện phòng (URL)
            </label>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-40 h-32 rounded-3xl overflow-hidden border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50">
                {formData.thumbnail ? (
                  <img
                    src={formData.thumbnail}
                    className="w-full h-full object-cover"
                    alt="Preview"
                  />
                ) : (
                  <span className="material-symbols-outlined text-slate-300 text-4xl">
                    bed
                  </span>
                )}
              </div>
              <input
                type="text"
                className="flex-1 px-5 h-14 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white transition-all font-bold text-xs"
                placeholder="Nhập URL ảnh đại diện..."
                value={formData.thumbnail}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail: e.target.value })
                }
              />
            </div>
          </div>

          {/* Ảnh chi tiết */}
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
              Ảnh chi tiết phòng
            </label>
            <EditUploadImages
              existingImages={existingImages}
              setExistingImages={setExistingImages}
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              max={4}
            />
            <input
              type="file"
              multiple
              onChange={(e) =>
                setSelectedFiles(Array.from(e.target.files || []))
              }
              className="mt-4 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* ==== TIỆN ÍCH (AMENITIES) ==== */}
          <div className="md:col-span-2 space-y-4">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
              Tiện ích phòng
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {amenities.map((amenity) => {
                const isChecked = amenityIds.includes(amenity._id);
                return (
                  <label
                    key={amenity._id}
                    className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      isChecked
                        ? "border-blue-600 bg-blue-50 shadow-sm"
                        : "border-slate-100 bg-slate-50 hover:border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                          isChecked
                            ? "bg-blue-600 border-blue-600"
                            : "bg-white border-slate-300"
                        }`}
                      >
                        {isChecked && (
                          <span className="material-symbols-outlined text-white text-[16px]">
                            check
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-sm font-bold ${isChecked ? "text-blue-900" : "text-slate-500"}`}
                      >
                        {amenity.name}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isChecked}
                      onChange={() => {
                        setAmenityIds((prev) =>
                          isChecked
                            ? prev.filter((id) => id !== amenity._id)
                            : [...prev, amenity._id],
                        );
                      }}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Mô tả */}
          <div className="md:col-span-2 group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
              Mô tả bổ sung
            </label>
            <textarea
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white transition-all font-bold text-sm"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>

        {/* Nút thao tác */}
        <div className="pt-10 border-t border-slate-100 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-8 h-12 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-50"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            disabled={loadingSubmit}
            className={`px-10 h-12 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${
              loadingSubmit
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20"
            }`}
          >
            {loadingSubmit ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>{" "}
                Đang lưu...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">save</span>{" "}
                Cập nhật phòng
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoomForm;
