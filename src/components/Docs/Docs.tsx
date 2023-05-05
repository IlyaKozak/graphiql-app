import { DocsType } from '../../types/docs';
import classes from './docs.module.css';
import { useState, useEffect } from 'react';
import arrow from '../../../public/left-arrow.svg';
import cross from '../../../public/cross-small.svg';
import Image from 'next/image';
import { __Field, __Type, __InputValue } from '@/types/schema';
import { findNameType, findArguments } from '../../services/findNameType';
import { ValueRoot } from '../../types/docs';
import { DocsArguments } from './DocsArguments';
import { useLocaleContext } from '../../context/locale.context';

export default function Docs({ schema }: DocsType) {
  const [nameHeader, setNameHeader] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [showBtnBack, setShowBtnBack] = useState(false);
  const [valueBtnBack, setValueBtnBack] = useState<string>('');
  const [stack, setStack] = useState<Array<__Type | __Field | __InputValue>>([]);
  const [active, setActive] = useState(false);

  console.log(schema);
  const [locale] = useLocaleContext();
  const {
    main: { docsLable },
  } = locale;

  const handleLableClick = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (schema) {
      setStack([schema.queryType]);
      setDescription('A GraphQL schema provides a root type for each kind of operation.');
      setNameHeader('Documentation Explorer');
    } else {
      setStack([]);
      setNameHeader('Documentation Explorer');
    }
  }, [schema]);

  useEffect(() => {
    stack.length > 1 ? setShowBtnBack(true) : setShowBtnBack(false);
    if (stack.length === 1) {
      setDescription('A GraphQL schema provides a root type for each kind of operation.');
      setNameHeader('Documentation Explorer');
    } else if (stack.length > 1) {
      /* stack[stack.length - 1].description
        ? setDescription(String(stack[stack.length - 1].description))
        : setDescription('No Description'); */
      setNameHeader(String(stack[stack.length - 1].name));
      setValueBtnBack(String(stack[stack.length - 1].name));
      stack.length === 2
        ? setValueBtnBack('Schema')
        : setValueBtnBack(String(stack[stack.length - 2].name));
    }
  }, [stack]);

  function handleClickRoot(value: ValueRoot) {
    if (value === schema?.queryType.name) {
      const arrTypes = schema?.types.filter((item) => item.name == value);
      const typesRoot = arrTypes.find((item) => item.fields !== null);

      if (typesRoot) {
        setStack((prevStack) => prevStack.concat(typesRoot));
        typesRoot.description
          ? setDescription(String(typesRoot.description))
          : setDescription('No Description');
      }
    }
  }

  function handleClickField(value: string | null) {
    if (value !== null) {
      const typesRoot = schema?.types.find((item) => item.name === value);
      if (typesRoot) {
        setStack((prevStack) => prevStack.concat(typesRoot));
        typesRoot.description
          ? setDescription(String(typesRoot.description))
          : setDescription('No Description');
      }
    }
  }

  function handleClickArgument(value: string | null) {
    if (value !== null) {
      const typesRoot = schema?.types.find((item) => item.name === value);
      if (typesRoot) {
        setStack((prevStack) => prevStack.concat(typesRoot));
        typesRoot.description
          ? setDescription(String(typesRoot.description))
          : setDescription('No Description');
      }
    }
  }

  function handleClickKey(item: __Field | __InputValue) {
    if (item) {
      setStack((prevStack) => prevStack.concat(item));
      item.description
        ? setDescription(String(item.description))
        : setDescription('No Description');
    }
  }

  function hadleClickBack() {
    setStack((prevStack) => prevStack.slice(0, -1));
    stack[stack.length - 2].description
      ? setDescription(String(stack[stack.length - 2].description))
      : setDescription('No Description');
  }

  return (
    <div className={active ? classes.docsVisible : classes.docsInvisible}>
      <div onClick={handleLableClick} className={classes.lable}>
        {docsLable}
      </div>
      <div className={classes.headerDocs}>
        <div className={classes.backBtn}>
          <div
            onClick={hadleClickBack}
            className={showBtnBack ? classes.backShow : classes.backHidden}
          >
            <Image className={classes.backArrow} src={arrow} alt="back stack" />
            <span className={classes.span_backBtn}>{valueBtnBack}</span>
          </div>
        </div>
        <Image
          onClick={handleLableClick}
          className={classes.cross}
          src={cross}
          alt="image for close docs"
        />
      </div>
      <h3 className={classes.h3_Docs}>{nameHeader}</h3>
      {schema ? (
        <>
          <p>{description}</p>
          <div>
            {stack.length === 1 && (
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
            )}

            {stack.length > 1 && (
              <>
                {(stack[stack.length - 1] as __Type).fields && (
                  <p className={classes.docs_mainDocs_header}>fields</p>
                )}
                {(stack[stack.length - 1] as __Type).fields?.map((item, index) => {
                  return (
                    <div className={classes.div_afterQuery} key={index}>
                      <div className={classes.p_Docs}>
                        <span onClick={() => handleClickKey(item)} className={classes.keyClick}>
                          {item.name}
                        </span>
                        <DocsArguments item={item} handleClickArgument={handleClickArgument} />
                      </div>
                      <span className={classes.key}>: </span>
                      <span
                        onClick={() => handleClickField(findNameType('key', item.type))}
                        className={classes.click}
                      >
                        {findNameType('value', item.type)}
                      </span>
                    </div>
                  );
                })}
              </>
            )}

            {stack.length > 1 &&
              String((stack[stack.length - 1] as __Type).kind) === 'INPUT_OBJECT' && (
                <>
                  {(stack[stack.length - 1] as __Type).inputFields && (
                    <p className={classes.docs_mainDocs_header}>fields</p>
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
                          onClick={() => handleClickField(findNameType('key', item.type))}
                          className={classes.click}
                        >
                          {findNameType('value', item.type)}
                        </span>
                      </div>
                    );
                  })}
                </>
              )}

            {stack.length > 1 &&
              !('kind' in stack[stack.length - 1]) &&
              (stack[stack.length - 1] as __Field) &&
              (stack[stack.length - 1] as __Field).args && (
                <>
                  <p className={classes.docs_mainDocs_header}>type</p>
                  <span
                    onClick={() =>
                      handleClickField(
                        findNameType('key', (stack[stack.length - 1] as __Field).type)
                      )
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
                                onClick={() => handleClickArgument(findArguments('key', arg.type))}
                                className={classes.click}
                              >
                                {findArguments('value', arg.type)}
                              </span>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </>
              )}

            {stack.length > 1 &&
              !('kind' in stack[stack.length - 1]) &&
              (stack[stack.length - 1] as __Field) &&
              !('args' in (stack[stack.length - 1] as __InputValue)) && (
                <>
                  <p className={classes.docs_mainDocs_header}>type</p>
                  <span
                    onClick={() =>
                      handleClickField(
                        findNameType('key', (stack[stack.length - 1] as __Field).type)
                      )
                    }
                    className={classes.click}
                  >
                    {findNameType('value', (stack[stack.length - 1] as __Field).type)}
                  </span>
                </>
              )}
          </div>
        </>
      ) : (
        <h3 className={classes.h3_noSchema}>NO SCHEMA AVAILABLE</h3>
      )}
    </div>
  );
}
