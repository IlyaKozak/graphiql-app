import { Key, TAB_SPACES } from '../constants/textFormatting';

const formatText = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
  const key = event.key;

  const target = event.target as HTMLTextAreaElement;
  const text = target.value;
  const start = target.selectionStart;
  const end = target.selectionEnd;
  const isNotSelected = start === end;
  const hasSpacesToDelete = text.slice(start - TAB_SPACES, start) === ' '.repeat(TAB_SPACES);

  let formattedText = null;
  let selectionStart = null;

  if (
    key === Key.Enter ||
    key === Key.Tab ||
    key === Key.OpenBracket ||
    (key === Key.Backspace && isNotSelected && hasSpacesToDelete)
  ) {
    event.preventDefault();
    [formattedText, selectionStart] = prettifyText(text, start, end, key);
  }
  return {
    value: formattedText,
    selectionStart,
  };
};

function prettifyText(text: string, start: number, end: number, key: string): [string, number] {
  let addText = '';
  let removeTextChars = 0;
  let selectionStart = start;

  switch (key) {
    case Key.Tab:
      addText = ' '.repeat(TAB_SPACES);
      selectionStart += TAB_SPACES;
      break;
    case Key.Backspace:
      removeTextChars = TAB_SPACES;
      selectionStart -= TAB_SPACES;
      break;
    case Key.OpenBracket:
      addText = '{}';
      selectionStart += 1;
      break;
    case Key.Enter:
      const firstPart = text.slice(0, start);
      let openBracketsCount =
        (firstPart.match(/{/g) || []).length - (firstPart.match(/}/g) || []).length;
      openBracketsCount = openBracketsCount < 0 ? 0 : openBracketsCount;
      const openBracketsCountOneLess = openBracketsCount - 1 < 0 ? 0 : openBracketsCount - 1;

      addText = `\n${' '.repeat(TAB_SPACES * openBracketsCount)}${
        /{ *}/.test(text) ? '\n' + ' '.repeat(TAB_SPACES * openBracketsCountOneLess) : ''
      }`;
      selectionStart += openBracketsCount * TAB_SPACES + 1;
      break;
  }
  return [text.slice(0, start - removeTextChars) + addText + text.slice(end), selectionStart];
}

export default formatText;
