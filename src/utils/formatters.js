export const formatDuration = (mins) => {
  if (!mins || typeof mins !== "number") return "";
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return {hours, minutes};
};
