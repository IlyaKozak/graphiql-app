import classes from './docs.module.css';
import { __Field, __InputValue } from '@/types/schema';
import { findNameType } from '@/services/findNameType';
import { InputFieldDocsType } from '@/types/docs';

export function InputField({ stack, handleSearchTypes }: InputFieldDocsType) {
  return (
    <>
      <p className={classes.docs_mainDocs_header}>type</p>
      <span
        onClick={() =>
          handleSearchTypes(findNameType('key', (stack[stack.length - 1] as __Field).type))
        }
        className={classes.click}
      >
        {findNameType('value', (stack[stack.length - 1] as __InputValue).type)}
      </span>
    </>
  );
}
