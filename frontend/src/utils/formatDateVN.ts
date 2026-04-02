// src/utils/formatDateVN.ts

// hiển thị đầy đủ thông tin thời gian
export function formatDateVN(dateInput: string | Date): string {
  const date = new Date(dateInput);

  // Tính offset giờ Việt Nam (UTC+7)
  const vietnamOffset = 7 * 60; // phút
  const localOffset = date.getTimezoneOffset(); // phút hiện tại
  const diff = vietnamOffset + localOffset;
  date.setMinutes(date.getMinutes() + diff);

  // Lấy thứ
  const weekdays = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const dayName = weekdays[date.getDay()];

  // Định dạng ngày giờ
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${dayName}, ${day}/${month}/${year} ${hours}:${minutes}`;
}

// export const formatDateDDMMYY = (dateStr: string) => {
//   const date = new Date(dateStr);
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = String(date.getFullYear()).slice(-2); // lấy 2 số cuối năm
//   return `${day}/${month}/${year}`;
// };
export const formatDateDDMMYY = (dateStr: string) => {
  if (!dateStr) return "";

  const [year, month, day] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = String(date.getFullYear()).slice(-2);

  return `${d}/${m}/${y}`;
};
