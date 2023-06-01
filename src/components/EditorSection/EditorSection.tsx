import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import searchIcon from '@/../public/search-icon.svg';
import arrowIcon from '@/../public/vertical-arrow.svg';
import graphiQLService from '@/services/GraphiQLService';
import { useLocaleContext } from '@/context/locale.context';
import { MyTextarea } from '@/components/MyTextarea/MyTextarea';
import { LoaderRequest } from '@/components/LoaderRequest/LoaderRequest';
import { TAB_SPACES } from '@/constants/textFormatting';
import { __Schema } from '@/types/schema';
import classes from './EditorSection.module.css';

interface IEditorSectionProps {
  setResponse: Dispatch<SetStateAction<string | null>>;
  endpoint: string;
  schema: __Schema | null;
  setShowToast: Dispatch<SetStateAction<boolean>>;
  setErrorMessageToast: Dispatch<SetStateAction<string>>;
}

function EditorSection({
  setResponse,
  endpoint,
  schema,
  setShowToast,
  setErrorMessageToast,
}: IEditorSectionProps) {
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
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      graphiQLService(
        endpoint,
        queryAreaRef.current?.value,
        variablesAreaRef.current?.value,
        headersAreaRef.current?.value
      )
        .then((data) => {
          setResponse(JSON.stringify(data, null, TAB_SPACES));
          setIsLoading(false);
        })
        .catch((error: Error) => {
          if (error instanceof SyntaxError || error instanceof TypeError) {
            setShowToast(true);
            setErrorMessageToast(error.message);
            setResponse('');
          } else {
            setShowToast(false);
            setResponse(error.message);
          }
          setIsLoading(false);
        });
    } else {
      return;
    }
  };

  const handleVariablesLableClick = () => {
    if (!showTextareas) {
      setVariablesAreaVisibleClass(classes.variablesAreaVisible);
      setVariablesAreaInvisibleClass(classes.variablesAreaInisible);
      setHeadersAreaVisibleClass(classes.headersAreaVisible);
      setHeadersAreaInvisibleClass(classes.headersAreaInisible);
      setShowTextareas(true);
    }
    if (variablesLableActive) {
      return;
    } else {
      setVariablesLableActive(true);
    }
  };

  const handleHeadersLableClick = () => {
    if (!showTextareas) {
      setVariablesAreaVisibleClass(classes.variablesAreaVisible);
      setVariablesAreaInvisibleClass(classes.variablesAreaInisible);
      setHeadersAreaVisibleClass(classes.headersAreaVisible);
      setHeadersAreaInvisibleClass(classes.headersAreaInisible);
      setShowTextareas(true);
    }
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
        {isLoading ? (
          <div className={classes.wrapperLoaderRequest}>
            <LoaderRequest />
          </div>
        ) : (
          <img
            className={classes.search}
            onClick={handleQuerySubmit}
            src={searchIcon.src}
            alt="search schema"
          />
        )}
        <div className={classes.textareas}>
          <MyTextarea
            schema={schema}
            withHints={true}
            condition={showTextareas}
            placeholderValue={queryPlaceholder}
            textareaFirstClass={classes.queryArea}
            textreaSecondClass={classes.queryAreaExtended}
            ref={queryAreaRef}
          />
          <img
            className={showTextareas ? classes.arrowUp : classes.arrowDown}
            onClick={handleArrowClick}
            src={arrowIcon.src}
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
              <MyTextarea
                schema={schema}
                condition={variablesLableActive}
                placeholderValue={variablesPlaceholder}
                textareaFirstClass={variablesAreaVisibleClass}
                textreaSecondClass={variablesAreaInvisibleClass}
                ref={variablesAreaRef}
              />
            </div>
            <div className={classes.headersWrapper}>
              <div
                onClick={handleHeadersLableClick}
                className={variablesLableActive ? lableHeadersClass : lableHeadersActiveClass}
              >
                {headersLable}
              </div>
              <MyTextarea
                schema={schema}
                condition={variablesLableActive}
                placeholderValue={headersPlaceholder}
                textareaFirstClass={headersAreaInvisibleClass}
                textreaSecondClass={headersAreaVisibleClass}
                ref={headersAreaRef}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditorSection;
