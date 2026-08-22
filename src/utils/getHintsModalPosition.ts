const getHintsModalPosition = (text: string, selectionStart: number) => {
  const textFirstPart = text.slice(0, selectionStart);
  const row = (textFirstPart.match(/\n/g) || []).length;
  const column = (textFirstPart.match(/.*$/) || [''])[0].length;
  return {
    row,
    column,
  };
};

export default getHintsModalPosition;
