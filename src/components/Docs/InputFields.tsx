import classes from './docs.module.css';
import { __Type } from '@/types/schema';
import { findNameType } from '@/services/findNameType';
import { InputFieldsDocsType } from '@/types/docs';
import { useLocaleContext } from '@/context/locale.context';

export function InputFields({ stack, handleSearchTypes, handleClickKey }: InputFieldsDocsType) {
  const [locale] = useLocaleContext();
  const {
    docs: { fields },
  } = locale;

  return (
    <>
      {(stack[stack.length - 1] as __Type).inputFields && (
        <p className={classes.docs_mainDocs_header}>{fields}</p>
      )}
      {(stack[stack.length - 1] as __Type).inputFields?.map((item, index) => {
        return (
          <div className={classes.div_afterQuery} key={index}>
            <div className={classes.p_Docs}>
              <span onClick={() => handleClickKey(item)} className={classes.keyClick}>
                {item.name}
              </span>
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
