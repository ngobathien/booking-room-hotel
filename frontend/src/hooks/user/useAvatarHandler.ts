// import { useState } from "react";
// import { toast } from "react-toastify";
// import { SupabaseService } from "../config/supabase.config";
// import { useUserActions } from "../hooks/user/useUserActions";
// import type { User } from "../types/user.types";

// type Props = {
//   user: User;
//   supabaseService: SupabaseService;
// };

// export const useAvatarHandler = ({ user, supabaseService }: Props) => {
//   const [avatarUrl, setAvatarUrl] = useState(
//     user.avatar || "/default-avatar.png",
//   );
//   const { handleUpdateUser } = useUserActions();
//   const bucketName = process.env.SUPABASE_BUCKET_AVATARS!; // "avatars"

//   const uploadAvatar = async (file: File) => {
//     try {
//       if (!file.type.startsWith("image/")) {
//         throw new Error("File không phải ảnh");
//       }

//       const path = `avatars/${user._id}-${Date.now()}-${file.name}`;
//       const { data, error } = await supabaseService.client.storage
//         .from(bucketName)
//         .upload(path, file, { contentType: file.type, upsert: true });

//       if (error) throw error;

//       const { publicUrl } = supabaseService.client.storage
//         .from(bucketName)
//         .getPublicUrl(path);

//       // Cập nhật DB
//       await handleUpdateUser(user._id, { avatar: publicUrl });

//       setAvatarUrl(publicUrl);
//       toast.success("Cập nhật avatar thành công");
//     } catch (err: any) {
//       toast.error(err.message || "Cập nhật avatar thất bại");
//     }
//   };

//   return { avatarUrl, setAvatarUrl, uploadAvatar };
// };
