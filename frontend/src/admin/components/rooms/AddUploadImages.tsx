import React, { useRef } from "react";

interface UploadImagesProps {
  files: File[];
  setFiles: (files: File[]) => void;
  max?: number;
}

const AddUploadImages: React.FC<UploadImagesProps> = ({
  files,
  setFiles,
  max = 4,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const updatedFiles = [...files, ...newFiles].slice(0, max);
    setFiles(updatedFiles);
  };

  const removeImage = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
  };

  return (
    <div>
      <h3 className="text-sm font-bold mb-4">Images</h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: max }).map((_, index) => {
          const file = files[index];

          // Nếu có file -> hiển thị ảnh
          if (file) {
            return (
              <div
                key={index}
                className="relative h-28 rounded-2xl overflow-hidden border border-slate-200 group"
              >
                <img
                  src={URL.createObjectURL(file)}
                  className="w-full h-full object-cover"
                  alt="preview"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            );
          }

          // Nếu chưa có file -> hiển thị box upload
          return (
            <div
              key={index}
              onClick={handleClick}
              className="h-28 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <span className="material-symbols-outlined text-2xl text-slate-400">
                cloud_upload
              </span>
              <span className="text-xs text-slate-400 mt-1">Upload</span>
            </div>
          );
        })}
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        hidden
        ref={inputRef}
        onChange={handleChange}
      />
    </div>
  );
};

export default AddUploadImages;
