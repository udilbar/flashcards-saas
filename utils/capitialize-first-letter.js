export default function capitalizeFirstLetter(str) {
  if (!str) return str; // Handle empty string or null
  return str.charAt(0).toUpperCase() + str.slice(1);
}