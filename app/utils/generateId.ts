export function generateUniqueId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const randomDigits = Array.from({ length: 3 }, () => Math.floor(Math.random() * 9) + 1).join("");

  return `${year}${month}${day}${hours}${minutes}${seconds}${randomDigits}`;
}
