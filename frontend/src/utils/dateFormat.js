export const dateFormat = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
};
