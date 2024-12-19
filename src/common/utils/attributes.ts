export const parseAttributeToString = (arrAttr: { name: string }[] | undefined) => {
  if (!arrAttr) {
    return '';
  }
  return arrAttr.map((item) => item.name).join(', ');
};

export function parseNFTIdToNumber(id: string) {
  return parseInt(id, 16);
}
