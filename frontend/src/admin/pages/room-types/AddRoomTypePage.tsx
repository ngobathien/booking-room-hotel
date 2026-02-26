import { toast } from "react-toastify";
import { createNewRoomType } from "../../../common/services/roomTypeService";

import { useNavigate } from "react-router";
import RoomTypeFormFields from "../../components/room-types/RoomTypeFormFields";

const AddRoomTypePage = () => {
  const navigate = useNavigate();

  const handleCreate = async (data: any) => {
    await createNewRoomType({
      ...data,
      capacity: Number(data.capacity),
      pricePerNight: Number(data.pricePerNight),
    });
    toast.success("Thêm loại phòng thành công");
    navigate("/dashboard/room-types");
  };

  return <RoomTypeFormFields mode="create" onSubmit={handleCreate} />;
};

export default AddRoomTypePage;
