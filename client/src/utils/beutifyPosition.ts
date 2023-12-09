export const beautifyPos = (pos?: number) => {
  if (!pos) return "00";
  if (pos < 10) return "0" + pos;
  return pos;
};
