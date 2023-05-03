import { DocsArgumentsType } from '@/types/docs';
import classes from './docs.module.css';

export function DocsArguments({ item }: DocsArgumentsType) {
  return (
    <div className={classes.p_Docs}>
      {item.args &&
        item.args.map((arg, indexArg) => {
          return (
            <div className={classes.p_Docs} key={indexArg}>
              <span>{indexArg === 0 ? `(${arg.name}: ` : `${arg.name}: `}</span>
              <span>{indexArg !== item.args.length - 1 ? 'some, ' : 'some) '}</span>
            </div>
          );
        })}
    </div>
  );
}
