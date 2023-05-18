import { DocsArgumentsType } from '@/types/docs';
import { findNameType } from '@/services/findNameType';
import { __Field } from '@/types/schema';
import classes from './docs.module.css';

export function DocsArguments({ field, handleClickArgument }: DocsArgumentsType) {
  return (
    <div className={classes.p_Docs}>
      {(field as __Field).args &&
        (field as __Field).args.map((arg, indexArg) => {
          return (
            <div className={classes.p_Docs} key={indexArg}>
              <span
                className={classes.key}
                dangerouslySetInnerHTML={{ __html: indexArg === 0 ? '(' : '&nbsp;' }}
              ></span>
              <span className={classes.key}>{`${arg.name}: `}</span>
              <span
                onClick={() => handleClickArgument(findNameType('key', arg.type))}
                className={classes.click}
              >
                {findNameType('value', arg.type)}
              </span>
              <span className={classes.key}>
                {indexArg !== (field as __Field).args.length - 1 ? ', ' : ')'}
              </span>
            </div>
          );
        })}
    </div>
  );
}
