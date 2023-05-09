import { forwardRef } from 'react';

interface IMyTextareaProps {
  condition: boolean;
  placeholderValue: string;
  textareaFirstClass: string;
  textreaSecondClass: string;
}

type Ref = IMyTextareaProps;

export const MyTextarea = forwardRef<HTMLTextAreaElement, Ref>(
  (
    { condition, placeholderValue, textareaFirstClass, textreaSecondClass }: IMyTextareaProps,
    ref
  ) => {
    return (
      <>
        <textarea
          className={condition ? textareaFirstClass : textreaSecondClass}
          ref={ref}
          placeholder={placeholderValue}
        ></textarea>
      </>
    );
  }
);
