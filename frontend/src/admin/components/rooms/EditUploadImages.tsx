import React, { useRef } from "react";

interface EditUploadImagesProps {
  existingImages: string[];
  setExistingImages: React.Dispatch<React.SetStateAction<string[]>>;

  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;

  max?: number;
}

const EditUploadImages: React.FC<EditUploadImagesProps> = ({
  existingImages,
  setExistingImages,
  selectedFiles,
  setSelectedFiles,
  max = 4,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);

    const remainingSlots = max - (existingImages.length + selectedFiles.length);

    const allowedFiles = newFiles.slice(0, remainingSlots);

    setSelectedFiles([...selectedFiles, ...allowedFiles]);
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3 className="text-sm font-bold mb-4">Images</h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* ===== ẢNH CŨ ===== */}
        {existingImages.map((img, index) => (
          <div
            key={`old-${index}`}
            className="relative h-28 rounded-2xl overflow-hidden border border-slate-200 group"
          >
            <img src={img} className="w-full h-full object-cover" alt="old" />

            <button
              type="button"
              onClick={() => removeExistingImage(index)}
              className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
        ))}

        {/* ===== ẢNH MỚI ===== */}
        {selectedFiles.map((file, index) => (
          <div
            key={`new-${index}`}
            className="relative h-28 rounded-2xl overflow-hidden border border-slate-200 group"
          >
            <img
              src={URL.createObjectURL(file)}
              className="w-full h-full object-cover"
              alt="preview"
            />

            <button
              type="button"
              onClick={() => removeNewImage(index)}
              className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
        ))}

        {/* ===== SLOT UPLOAD ===== */}
        {existingImages.length + selectedFiles.length < max && (
          <div
            onClick={handleClick}
            className="h-28 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <span className="material-symbols-outlined text-2xl text-slate-400">
              cloud_upload
            </span>
            <span className="text-xs text-slate-400 mt-1">Upload</span>
          </div>
        )}
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

export default EditUploadImages;
