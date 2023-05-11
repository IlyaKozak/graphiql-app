import { RefObject, forwardRef, useEffect, useState } from 'react';

import formatText from '../../utils/formatText';
import { Key } from '../../constants/textFormatting';
import { __Schema } from '../../types/schema';
import getHints from '../../utils/getHints';
import { HintsModal } from './HintsModal';
import insertSelection from '../../utils/insertSelection';
import getHintsModalPosition from '../../utils/getHintsModalPosition';

interface IMyTextareaProps {
  condition: boolean;
  placeholderValue: string;
  textareaFirstClass: string;
  textreaSecondClass: string;
  schema?: __Schema | null;
  withHints?: boolean;
}

type Ref = IMyTextareaProps;

export type HintsModalPosition = {
  row: number;
  column: number;
  containerWidth: number;
  containerHeight: number;
};

export const MyTextarea = forwardRef<HTMLTextAreaElement, Ref>(
  (
    {
      condition,
      placeholderValue,
      textareaFirstClass,
      textreaSecondClass,
      schema,
      withHints,
    }: IMyTextareaProps,
    ref
  ) => {
    const [textAreaValue, setTextAreaValue] = useState('');
    const [hints, setHints] = useState<string[] | null>(null);
    const [hintsModalPosition, setHintsModalPosition] = useState<HintsModalPosition | null>(null);
    const [textAreaSelectionStart, setTextAreaSelectionStart] = useState<null | number>(null);
    const textAreaRef = ref as RefObject<HTMLTextAreaElement>;

    useEffect(() => {
      if (textAreaSelectionStart === null || !textAreaRef) return;

      textAreaRef.current!.selectionStart = textAreaSelectionStart;
      textAreaRef.current!.selectionEnd = textAreaSelectionStart;
    }, [textAreaRef, textAreaValue, textAreaSelectionStart]);

    useEffect(() => {
      setTextAreaValue('');
    }, [schema]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (withHints && schema && event.ctrlKey && event.code === Key.Space) {
        const hints = getHints(event, schema);
        if (!hints || !hints.length) return;
        setHintsModalPosition({
          ...getHintsModalPosition(textAreaValue, textAreaRef.current!.selectionStart),
          containerWidth: textAreaRef.current!.offsetWidth,
          containerHeight: textAreaRef.current!.offsetHeight,
        });
        setHints(hints);
        return;
      }

      const { value, selectionStart } = formatText(event);
      if (value === null) return;

      setTextAreaSelectionStart(selectionStart);
      setTextAreaValue(value);
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (textAreaSelectionStart !== null) {
        setTextAreaSelectionStart(null);
      }

      setTextAreaValue(event.target.value);
    };

    const handleEscape = () => {
      setHints(null);
      textAreaRef.current!.focus();
    };

    const handleSelect = (selectionValue: string) => {
      const { value, selectionStart } = insertSelection(
        textAreaRef.current!.value,
        textAreaRef.current!.selectionStart,
        selectionValue
      );

      setTextAreaSelectionStart(selectionStart);
      setTextAreaValue(value);
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
        {schema && hints && (
          <HintsModal
            hints={hints}
            handleSelect={handleSelect}
            handleEscape={handleEscape}
            position={hintsModalPosition}
          />
        )}
      </>
    );
  }
);
