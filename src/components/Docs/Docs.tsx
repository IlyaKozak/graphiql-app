import { useState, useEffect } from 'react';

import { DocsType } from '@/types/docs';
import { __Field, __Type, __InputValue } from '@/types/schema';
import { ValueRoot } from '@/types/docs';
import { useLocaleContext } from '@/context/locale.context';
import { Root } from './Root';
import { Fields } from './Fields';
import { InputFields } from './InputFields';
import { Field } from './Field';
import { InputField } from './InputField';
import { HeaderDocs } from './HeaderDocs';
import classes from './docs.module.css';

export default function Docs({ schema, handleLableClick }: DocsType) {
  const [nameHeader, setNameHeader] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [showBtnBack, setShowBtnBack] = useState(false);
  const [valueBtnBack, setValueBtnBack] = useState<string>('');
  const [stack, setStack] = useState<Array<__Type | __Field | __InputValue>>([]);
  const [locale] = useLocaleContext();

  const {
    lang,
    docs: { title, descrStart, descrAbsence, schemaLibrary, noSchema },
  } = locale;

  useEffect(() => {
    if (schema) {
      setStack([schema.queryType]);
    } else {
      setStack([]);
    }
  }, [schema]);

  useEffect(() => {
    stack.length > 1 ? setShowBtnBack(true) : setShowBtnBack(false);
    if (stack.length === 1) {
      setDescription(descrStart);
      setNameHeader(title);
    } else if (stack.length > 1) {
      setNameHeader(String(stack[stack.length - 1].name));
      setValueBtnBack(String(stack[stack.length - 1].name));
      stack.length === 2
        ? setValueBtnBack(schemaLibrary)
        : setValueBtnBack(String(stack[stack.length - 2].name));
      stack[stack.length - 1].description
        ? setDescription(String(stack[stack.length - 1].description))
        : setDescription(descrAbsence);
    } else if (stack.length === 0) {
      setNameHeader(title);
    }
  }, [stack, lang, descrAbsence, descrStart, schemaLibrary, title]);

  function setStackDescription(item: __Type | __Field | __InputValue | undefined) {
    if (item) {
      setStack((prevStack) => prevStack.concat(item));
      item.description ? setDescription(String(item.description)) : setDescription(descrAbsence);
    }
  }

  function handleClickRoot(value: ValueRoot) {
    if (value === schema?.queryType.name) {
      const arrTypes = schema?.types.filter((item) => item.name == value);
      const typesRoot = arrTypes.find((item) => item.fields !== null);
      setStackDescription(typesRoot);
    }
  }

  function handleSearchTypes(value: string | null) {
    if (value !== null) {
      const typesRoot = schema?.types.find((item) => item.name === value);
      setStackDescription(typesRoot);
    }
  }

  function handleClickKey(item: __Field | __InputValue) {
    setStackDescription(item);
  }

  function hadleClickBack() {
    setStack((prevStack) => prevStack.slice(0, -1));
    stack[stack.length - 2].description
      ? setDescription(String(stack[stack.length - 2].description))
      : setDescription(descrAbsence);
  }

  return (
    <>
      <HeaderDocs
        showBtnBack={showBtnBack}
        valueBtnBack={valueBtnBack}
        hadleClickBack={hadleClickBack}
        handleLableClick={handleLableClick}
      />
      <h3 className={classes.h3_Docs}>{nameHeader}</h3>
      {schema ? (
        <>
          <p>{description}</p>
          <div>
            {stack.length === 1 && <Root handleClickRoot={handleClickRoot} stack={stack} />}

            {stack.length > 1 && (
              <Fields
                stack={stack}
                handleSearchTypes={handleSearchTypes}
                handleClickKey={handleClickKey}
              />
            )}

            {stack.length > 1 &&
              String((stack[stack.length - 1] as __Type).kind) === 'INPUT_OBJECT' && (
                <InputFields
                  stack={stack}
                  handleSearchTypes={handleSearchTypes}
                  handleClickKey={handleClickKey}
                />
              )}

            {stack.length > 1 &&
              !('kind' in stack[stack.length - 1]) &&
              (stack[stack.length - 1] as __Field) &&
              (stack[stack.length - 1] as __Field).args && (
                <Field stack={stack} handleSearchTypes={handleSearchTypes} />
              )}

            {stack.length > 1 &&
              !('kind' in stack[stack.length - 1]) &&
              !('args' in (stack[stack.length - 1] as __InputValue)) && (
                <InputField stack={stack} handleSearchTypes={handleSearchTypes} />
              )}
          </div>
        </>
      ) : (
        <h3 className={classes.h3_noSchema}>{noSchema}</h3>
      )}
    </>
  );
}
