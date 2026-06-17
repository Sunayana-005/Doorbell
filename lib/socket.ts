// Socket.IO instance accessor
export function getIO() {
  // @ts-ignore
  return global.io || null;
}
