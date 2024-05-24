export const beautifyPos = (pos?: number) => {
  if (pos === undefined) return "00";
  if (pos < 10) return "0" + (pos + 1);
  return pos + 1;
};
