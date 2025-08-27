// utils/formatDate.js
export function formatDate(isoString) {
  if (!isoString) return "";

  const date = new Date(isoString);

  // Options for day, month (short), and year
  const options = { day: "numeric", month: "short", year: "numeric" };

  return date.toLocaleDateString("en-GB", options);
}
