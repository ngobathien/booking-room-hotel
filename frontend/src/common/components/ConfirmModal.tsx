import React from "react";
import { AlertCircle } from "lucide-react";

interface ConfirmModalProps<T = any> {
  open: boolean;
  title?: string;
  message?: string;

  onConfirm: (data?: T) => void | Promise<void>;
  onCancel: () => void;

  confirmText?: string;
  cancelText?: string;

  data?: T;
  isDangerous?: boolean; // true = red button, false = blue button
  isLoading?: boolean;
}

const ConfirmModal = React.forwardRef<HTMLDivElement, ConfirmModalProps>(
  (
    {
      open,
      title = "Xác nhận",
      message = "Bạn có chắc chắn?",
      onConfirm,
      onCancel,
      confirmText = "Xác nhận",
      cancelText = "Hủy",
      data,
      isDangerous = true,
      isLoading = false,
    },
    ref,
  ) => {
    if (!open) return null;

    const handleConfirm = async () => {
      try {
        await onConfirm(data);
      } catch (error) {
        console.error("Error in confirm action:", error);
      }
    };

    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        onClick={onCancel}
        ref={ref}
      >
        <div
          className="bg-white rounded-2xl p-6 w-96 shadow-2xl text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {isDangerous && (
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          )}

          <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

          <div className="flex justify-center gap-3">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelText}
            </button>

            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className={`px-6 py-2 rounded-lg text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                isDangerous
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

ConfirmModal.displayName = "ConfirmModal";

export default ConfirmModal;
