export function generateId() {
  return (+new Date() + Math.floor(Math.random() * 999999)).toString(16);
}
