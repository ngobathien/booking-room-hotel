import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getDetailRoomTypeById,
  updateRoomTypeById,
} from "../../../common/services/roomTypeService";
import RoomTypeFormFields from "../../components/room-types/RoomTypeFormFields";

const EditRoomTypePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    getDetailRoomTypeById(id).then(setInitialData);
  }, [id]);

  const handleUpdate = async (data: any) => {
    await updateRoomTypeById(id!, data);
    toast.success("Cập nhật thành công");
    navigate("/dashboard/room-types");
  };

  if (!initialData) return null;

  return (
    <RoomTypeFormFields
      mode="edit"
      initialData={initialData}
      onSubmit={handleUpdate}
    />
  );
};

export default EditRoomTypePage;
