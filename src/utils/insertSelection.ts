const insertSelection = (text: string, selectionStart: number, value: string) => {
  const firstTextPart = text.slice(0, selectionStart);
  const secondTextPart = text.slice(selectionStart);
  const firstWordPart = (firstTextPart.match(/\w+$/) || [])[0];
  const secondWordPart = (secondTextPart.match(/^\w+/) || [])[0];
  const firstWordPartLength = firstWordPart?.length || 0;
  const secondWordPartLength = secondWordPart?.length || 0;

  return {
    value:
      text.slice(0, selectionStart - firstWordPartLength) +
      value +
      text.slice(selectionStart + secondWordPartLength),
    selectionStart: selectionStart + value.length - firstWordPartLength,
  };
};

export default insertSelection;
