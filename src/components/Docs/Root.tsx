import classes from './docs.module.css';
import { RootType } from '@/types/docs';

export function Root({ handleClickRoot, stack }: RootType) {
  return (
    <>
      <p className={classes.docs_mainDocs_header}>root types</p>
      <div>
        <span className={classes.keyQuery}>{`query: `}</span>
        <span
          onClick={() => handleClickRoot(stack[stack.length - 1].name)}
          className={classes.click}
        >
          {stack[stack.length - 1].name}
        </span>
      </div>
    </>
  );
}
