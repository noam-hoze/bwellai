export const convertUnderscoresToCapitalizeHeading = (key: string) => {
  return key
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};
