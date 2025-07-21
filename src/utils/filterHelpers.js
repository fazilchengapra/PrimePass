export const hasAnyFilterValue = (filters) => {
  return Object.values(filters).some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== null && value !== "";
  });
};
