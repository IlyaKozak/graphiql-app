import { DocsArgumentsType } from '@/types/docs';
import classes from './docs.module.css';
import { findArguments } from '@/services/findNameType';

export function DocsArguments({ item }: DocsArgumentsType) {
  return (
    <div className={classes.p_Docs}>
      {item.args &&
        item.args.map((arg, indexArg) => {
          return (
            <div className={classes.p_Docs} key={indexArg}>
              {/* <span>{indexArg === 0 ? `(` : '&nbsp;'}</span> */}
              <span
                className={classes.key}
                dangerouslySetInnerHTML={{ __html: indexArg === 0 ? '(' : '&nbsp;' }}
              ></span>
              <span className={classes.key}>{`${arg.name}: `}</span>
              <span className={classes.click}>{findArguments(arg.type)}</span>
              <span className={classes.key}>{indexArg !== item.args.length - 1 ? ', ' : ')'}</span>
            </div>
          );
        })}
    </div>
  );
}
