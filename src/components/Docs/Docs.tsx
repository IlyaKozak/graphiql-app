import { DocsType } from '../../types/docs';
import classes from './docs.module.css';
import { useState, useEffect } from 'react';
import arrow from '../../../public/left-arrow.svg';
import Image from 'next/image';
import { __Type, __TypeKind, __EnumValue, __Field, __InputValue } from '@/types/schema';
import { findNameType } from '../../services/findNameType';
import { ValueRoot } from '../../types/docs';
import { DocsArguments } from './DocsArguments';

export default function Docs({ schema }: DocsType) {
  const [nameHeader, setNameHeader] = useState<String>('');
  const [description, setDescription] = useState<String>('');
  const [showBtnBack, setShowBtnBack] = useState(false);
  const [valueBtnBack, setValueBtnBack] = useState<String>('');
  const [stack, setStack] = useState<Array<__Type>>([]);
  const [active, setActive] = useState(false);

  console.log(schema);

  const handleLableClick = () => {
    if (!active) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    if (schema) {
      setStack([schema.queryType]);
      setDescription('A GraphQL schema provides a root type for each kind of operation.');
      setNameHeader('Documentation Explorer');
    }
  }, [schema]);

  useEffect(() => {
    stack.length > 1 ? setShowBtnBack(true) : setShowBtnBack(false);
    if (stack.length === 1) {
      setDescription('A GraphQL schema provides a root type for each kind of operation.');
      setNameHeader('Documentation Explorer');
    } else if (stack.length > 1) {
      stack[stack.length - 1].description
        ? setDescription(String(stack[stack.length - 1].description))
        : setDescription('No Description');
      setNameHeader(String(stack[stack.length - 1].name));
      setValueBtnBack(String(stack[stack.length - 1].name));
      stack.length === 2
        ? setValueBtnBack('Schema')
        : setValueBtnBack(String(stack[stack.length - 2].name));
    }
  }, [stack]);

  if (!schema) {
    return <h3>NO SCHEMA AVAILABLE</h3>;
  }

  function handleClickRoot(value: ValueRoot) {
    if (value === schema?.queryType.name) {
      const arrTypes = schema?.types.filter((item) => item.name == value);
      const typesRoot = arrTypes.find((item) => item.fields !== null);

      if (typesRoot) {
        setStack((prevStack) => prevStack.concat(typesRoot));
      }
    }
  }

  function handleClickField(value: string | null) {
    if (value !== null) {
      const typesRoot = schema?.types.find((item) => item.name === value);
      if (typesRoot) {
        setStack((prevStack) => prevStack.concat(typesRoot));
      }
    }
  }

  function hadleClickBack() {
    console.log('back');
    setStack((prevStack) => prevStack.slice(0, -1));
  }

  return (
    <div className={active ? classes.docsVisible : classes.docsInvisible}>
      <div onClick={handleLableClick} className={classes.lable}>
        DOCS
      </div>
      <div className={classes.headerDocs}>
        <div
          onClick={hadleClickBack}
          className={showBtnBack ? classes.backShow : classes.backHidden}
        >
          <Image className={classes.backArrow} src={arrow} alt="back stack" />
          <span>{valueBtnBack}</span>
        </div>
        <h3>{nameHeader}</h3>
      </div>
      <p>{description}</p>
      <div>
        {stack.length === 1 &&
          Object.entries(stack[stack.length - 1]).map(([key, value]) => {
            return (
              <div key={key}>
                <span>{`query: `}</span>
                <span onClick={() => handleClickRoot(value)} className={classes.click}>
                  {JSON.stringify(value)}
                </span>
              </div>
            );
          })}

        {stack.length > 1 &&
          stack[stack.length - 1].fields?.map((item, index) => {
            return (
              <div key={index}>
                <div className={classes.p_Docs}>
                  <span>{item.name}</span>
                  <DocsArguments item={item} />
                </div>
                <span>: </span>
                <span
                  onClick={() => handleClickField(findNameType('key', item.type))}
                  className={classes.click}
                >
                  {findNameType('value', item.type)}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
