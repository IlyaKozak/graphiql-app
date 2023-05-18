import { RootType } from '@/types/docs';
import { useLocaleContext } from '@/context/locale.context';
import classes from './docs.module.css';

export function Root({ handleClickRoot, stack }: RootType) {
  const [locale] = useLocaleContext();
  const {
    docs: { rootType },
  } = locale;

  return (
    <>
      <p className={classes.docs_mainDocs_header}>{rootType}</p>
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
