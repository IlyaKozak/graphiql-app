import { useEffect, useRef } from 'react';

import { Key } from '@/constants/textFormatting';
import { HintsModalPosition } from './MyTextarea';
import classes from './HintsModal.module.css';

const MAX_NUMBER_OF_OPTIONS = 5;
const MIN_NUMBER_OF_OPTIONS = 2;
const ROW_HEIGHT_PX = 25;
const COLUMN_CHAR_WIDTH_PX = 6;
const DEFAULT_OFFSET_WIDTH_PX = 50;

type HintsModalProps = {
  hints: string[];
  handleEscape: () => void;
  handleSelect: (value: string) => void;
  position: HintsModalPosition | null;
};

export const HintsModal = ({ hints, handleEscape, handleSelect, position }: HintsModalProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const row = position?.row || 0 + 1;
  let top = row * ROW_HEIGHT_PX;
  const containerHeight = position?.containerHeight || 0;
  if (top > containerHeight) {
    top = containerHeight;
  }

  const column = position?.column || 0 + 1;
  let left = column * COLUMN_CHAR_WIDTH_PX;
  const containerWidth = position?.containerWidth || 0;
  if (left > containerWidth) {
    left = containerWidth - DEFAULT_OFFSET_WIDTH_PX;
  }

  let selectElementSize = hints.length;
  if (hints.length > MAX_NUMBER_OF_OPTIONS) {
    selectElementSize = MAX_NUMBER_OF_OPTIONS;
  }
  if (hints.length < MIN_NUMBER_OF_OPTIONS) {
    selectElementSize = MIN_NUMBER_OF_OPTIONS;
  }

  useEffect(() => {
    selectRef.current!.focus();
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSelectElement>) => {
    const { code } = event;

    if (code === Key.Enter || code === Key.Tab || code === Key.Space) {
      event.preventDefault();
      handleSelect(selectRef.current!.value);
      handleEscape();
    }
    if (event.code === Key.Escape) {
      handleEscape();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLSelectElement>) => {
    const { target } = event;
    if ((target as HTMLOptionElement).value) {
      handleSelect(selectRef.current!.value);
      handleEscape();
    }
  };

  return (
    <select
      className={classes.wrapper}
      onBlur={handleEscape}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      name="hints"
      ref={selectRef}
      defaultValue={hints[0]}
      size={selectElementSize}
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      {hints.map((hint) => (
        <option key={hint} value={hint}>
          {hint}
        </option>
      ))}
    </select>
  );
};
