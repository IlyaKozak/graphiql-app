import classes from './docs.module.css';
import { __Field } from '@/types/schema';
import { findNameType } from '@/services/findNameType';
import { FieldDocsType } from '@/types/docs';

export function Field({ stack, handleSearchTypes }: FieldDocsType) {
  return (
    <>
      <p className={classes.docs_mainDocs_header}>type</p>
      <span
        onClick={() =>
          handleSearchTypes(findNameType('key', (stack[stack.length - 1] as __Field).type))
        }
        className={classes.click}
      >
        {findNameType('value', (stack[stack.length - 1] as __Field).type)}
      </span>
      <div>
        {(stack[stack.length - 1] as __Field).args.length > 0 && (
          <>
            <p className={classes.docs_mainDocs_header}>arguments</p>
            {(stack[stack.length - 1] as __Field).args.map((arg, indexArg) => {
              return (
                <div key={indexArg}>
                  <span className={classes.key}>{`${arg.name}: `}</span>
                  <span
                    onClick={() => handleSearchTypes(findNameType('key', arg.type))}
                    className={classes.click}
                  >
                    {findNameType('value', arg.type)}
                  </span>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
