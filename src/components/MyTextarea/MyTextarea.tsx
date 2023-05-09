import { RefObject, forwardRef, useEffect, useState } from 'react';

import formatText from '../../utils/formatText';
import { Key } from '../../constants/textFormatting';

interface IMyTextareaProps {
  condition: boolean;
  placeholderValue: string;
  textareaFirstClass: string;
  textreaSecondClass: string;
  hasHints?: boolean;
}

type Ref = IMyTextareaProps;

export const MyTextarea = forwardRef<HTMLTextAreaElement, Ref>(
  (
    {
      condition,
      placeholderValue,
      textareaFirstClass,
      textreaSecondClass,
      hasHints,
    }: IMyTextareaProps,
    ref
  ) => {
    const [textAreaValue, setTextAreaValue] = useState('');
    const [textAreaSelectionStart, setTextAreaSelectionStart] = useState<null | number>(null);

    useEffect(() => {
      if (textAreaSelectionStart === null || !ref) return;

      (ref as RefObject<HTMLTextAreaElement>).current!.selectionStart = textAreaSelectionStart;
      (ref as RefObject<HTMLTextAreaElement>).current!.selectionEnd = textAreaSelectionStart;
    }, [ref, textAreaValue, textAreaSelectionStart]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (hasHints && event.ctrlKey && event.code === Key.Space) {
        return;
      }
      if (hasHints && event.code === Key.Escape) {
        return;
      }

      const { value, selectionStart } = formatText(event);
      if (!value) return;

      setTextAreaSelectionStart(selectionStart);
      setTextAreaValue(value);
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (textAreaSelectionStart !== null) {
        setTextAreaSelectionStart(null);
      }

      setTextAreaValue(event.target.value);
    };

    return (
      <>
        <textarea
          className={condition ? textareaFirstClass : textreaSecondClass}
          placeholder={placeholderValue}
          ref={ref}
          value={textAreaValue}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        ></textarea>
      </>
    );
  }
);
