import { useState, useEffect } from 'react';
import { DocsType } from '../../types/docs';
import styles from './docs.module.css';
import { __Type, __TypeKind, __EnumValue, __Field, __InputValue } from '@/types/schema';

type FieldsType = {
  fields: __Field[] | null;
};

type ValueRoot =
  | String
  | __Type
  | [__Type]
  | __TypeKind
  | [__Field]
  | [__EnumValue]
  | [__InputValue]
  | null;

export default function MainDocs({ schema }: DocsType) {
  const [stack, setStack] = useState<Array<__Type | FieldsType>>([]);

  useEffect(() => {
    if (schema) {
      setStack([schema.queryType]);
    }
  }, [schema]);

  if (!schema) {
    return <h3>NO SCHEMA AVAILABLE</h3>;
  }

  function handleClickRoot(value: ValueRoot) {
    if (value === schema?.queryType.name) {
      const arrTypes = schema?.types.filter((item) => item.name == value);
      const typesRoot = arrTypes.find((item) => item.fields !== null);

      if (typesRoot) {
        setStack((prevStack) => prevStack.concat({ fields: typesRoot?.fields }));
      }
    }
  }

  return (
    <>
      {stack.length === 1 &&
        Object.entries(stack[stack.length - 1]).map(([key, value]) => {
          return (
            <div key={key}>
              <span>{`query: `}</span>
              <span onClick={() => handleClickRoot(value)} className={styles.click}>
                {JSON.stringify(value)}
              </span>
            </div>
          );
        })}

      {stack.length > 1 &&
        stack[stack.length - 1].fields?.map((item, index) => {
          return (
            <div key={index}>
              <span>{`${item.name}: `}</span>
              <span className={styles.click}>
                {item.type.name === null
                  ? String(item.type.kind) == __TypeKind[6]
                    ? 'List'
                    : `[${item.type.ofType?.name}]`
                  : item.type.name}
              </span>
            </div>
          );
        })}
    </>
  );
}
