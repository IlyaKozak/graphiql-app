import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import classes from './EditorSection.module.css';
import searchIcon from '../../../public/search-icon.svg';
import arrowIcon from '../../../public/vertical-arrow.svg';
import Image from 'next/image';
import graphiQLService from '@/services/GraphiQLService';
import { useLocaleContext } from '../../context/locale.context';

interface IEditorSectionProps {
  setResponse: Dispatch<SetStateAction<string | null>>;
  endpoint: string;
}

function EditorSection({ setResponse, endpoint }: IEditorSectionProps) {
  const [variablesLableActive, setVariablesLableActive] = useState(true);
  const [showTextareas, setShowTextareas] = useState(true);
  const [variablesAreaVisibleClass, setVariablesAreaVisibleClass] = useState(
    classes.variablesAreaVisible
  );
  const [variablesAreaInvisibleClass, setVariablesAreaInvisibleClass] = useState(
    classes.variablesAreaInvisible
  );
  const [headersAreaVisibleClass, setHeadersAreaVisibleClass] = useState(
    classes.headersAreaVisible
  );
  const [headersAreaInvisibleClass, setHeadersAreaInvisibleClass] = useState(
    classes.headersAreaInvisible
  );
  const [lableHeadersClass, setLableHeadersClass] = useState(classes.lableHeadersEn);
  const [lableHeadersActiveClass, setLableHeadersActiveClass] = useState(
    classes.lableHeadersActiveEn
  );
  const [locale] = useLocaleContext();
  const {
    lang,
    main: {
      variablesPlaceholder,
      variablesLable,
      headersPlaceholder,
      headersLable,
      queryPlaceholder,
    },
  } = locale;

  const queryAreaRef = useRef<HTMLTextAreaElement>(null);
  const variablesAreaRef = useRef<HTMLTextAreaElement>(null);
  const headersAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (lang === 'ru') {
      setLableHeadersClass(classes.lableHeaders);
      setLableHeadersActiveClass(classes.lableHeadersActive);
    } else {
      setLableHeadersClass(classes.lableHeadersEn);
      setLableHeadersActiveClass(classes.lableHeadersActiveEn);
    }
  }, [lang]);

  const handleQuerySubmit = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.preventDefault();
    if (queryAreaRef.current?.value) {
      graphiQLService(
        endpoint,
        queryAreaRef.current?.value,
        variablesAreaRef.current?.value,
        headersAreaRef.current?.value
      )
        .then((data) => {
          setResponse(JSON.stringify(data, null, 2));
        })
        .catch((error: Error) => {
          setResponse(error.message);
        });
    } else {
      return;
    }
  };

  useEffect(() => {
    if (queryAreaRef.current) {
      queryAreaRef.current.value = '';
    }
    if (variablesAreaRef.current) {
      variablesAreaRef.current.value = '';
    }
    if (headersAreaRef.current) {
      headersAreaRef.current.value = '';
    }
  }, [endpoint]);

  const handleVariablesLableClick = () => {
    if (variablesLableActive) {
      return;
    } else {
      setVariablesLableActive(true);
    }
  };

  const handleHeadersLableClick = () => {
    if (!variablesLableActive) {
      return;
    } else {
      setVariablesLableActive(false);
    }
  };

  const handleArrowClick = () => {
    setShowTextareas(!showTextareas);
    if (showTextareas) {
      setVariablesAreaVisibleClass(classes.areaHidden);
      setVariablesAreaInvisibleClass(classes.areaHidden);
      setHeadersAreaVisibleClass(classes.areaHidden);
      setHeadersAreaInvisibleClass(classes.areaHidden);
    } else {
      setVariablesAreaVisibleClass(classes.variablesAreaVisible);
      setVariablesAreaInvisibleClass(classes.variablesAreaInisible);
      setHeadersAreaVisibleClass(classes.headersAreaVisible);
      setHeadersAreaInvisibleClass(classes.headersAreaInisible);
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Image
          className={classes.search}
          onClick={handleQuerySubmit}
          src={searchIcon}
          alt="search schema"
        />
        <div className={classes.textareas}>
          <textarea
            className={showTextareas ? classes.queryArea : classes.queryAreaExtended}
            ref={queryAreaRef}
            placeholder={queryPlaceholder}
          ></textarea>
          <Image
            className={showTextareas ? classes.arrowUp : classes.arrowDown}
            onClick={handleArrowClick}
            src={arrowIcon}
            alt="toggle texteareas"
          />
          <div
            className={
              showTextareas ? classes.variablesHedersWrapper : classes.variablesHedersWrapperHidden
            }
          >
            <div className={classes.variablesWrapper}>
              <div
                onClick={handleVariablesLableClick}
                className={
                  variablesLableActive ? classes.lableVariablesActive : classes.lableVariables
                }
              >
                {variablesLable}
              </div>
              <textarea
                className={
                  variablesLableActive ? variablesAreaVisibleClass : variablesAreaInvisibleClass
                }
                ref={variablesAreaRef}
                placeholder={variablesPlaceholder}
              ></textarea>
            </div>
            <div className={classes.headersWrapper}>
              <div
                onClick={handleHeadersLableClick}
                className={variablesLableActive ? lableHeadersClass : lableHeadersActiveClass}
              >
                {headersLable}
              </div>
              <textarea
                className={
                  variablesLableActive ? headersAreaInvisibleClass : headersAreaVisibleClass
                }
                ref={headersAreaRef}
                placeholder={headersPlaceholder}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditorSection;
