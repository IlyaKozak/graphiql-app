import classes from './docs.module.css';
import { __Type } from '@/types/schema';
import { DocsArguments } from './DocsArguments';
import { findNameType } from '@/services/findNameType';
import { FieldsDocsType } from '@/types/docs';
import { useLocaleContext } from '@/context/locale.context';

export function Fields({ stack, handleSearchTypes, handleClickKey }: FieldsDocsType) {
  const [locale] = useLocaleContext();
  const {
    docs: { fields },
  } = locale;

  return (
    <>
      {(stack[stack.length - 1] as __Type).fields && (
        <p className={classes.docs_mainDocs_header}>{fields}</p>
      )}
      {(stack[stack.length - 1] as __Type).fields?.map((item, index) => {
        return (
          <div className={classes.div_afterQuery} key={index}>
            <div className={classes.p_Docs}>
              <span onClick={() => handleClickKey(item)} className={classes.keyClick}>
                {item.name}
              </span>
              <DocsArguments field={item} handleClickArgument={handleSearchTypes} />
            </div>
            <span className={classes.key}>: </span>
            <span
              onClick={() => handleSearchTypes(findNameType('key', item.type))}
              className={classes.click}
            >
              {findNameType('value', item.type)}
            </span>
          </div>
        );
      })}
    </>
  );
}
