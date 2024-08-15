export const formatDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-AU", {
    month: "short",
    year: "numeric",
  });
};
