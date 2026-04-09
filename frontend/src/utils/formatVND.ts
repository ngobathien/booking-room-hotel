export const formatMoney = (value: string) => {
  const number = value.replace(/\D/g, "");
  return new Intl.NumberFormat("vi-VN").format(Number(number));
};

export const parseMoney = (value: string) => {
  return Number(value.replace(/\D/g, ""));
};
