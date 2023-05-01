import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import classes from './EditorSection.module.css';
import searchIcon from '../../../public/search-icon.svg';
import Image from 'next/image';
import graphiQLService from '@/models/GraphiQLService';

interface IEditorSectionProps {
  setResponse: Dispatch<SetStateAction<string | null>>;
  endpoint: string;
}

function EditorSection({ setResponse, endpoint }: IEditorSectionProps) {
  const queryAreaRef = useRef<HTMLTextAreaElement>(null);
  const variablesAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleQuerySubmit = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.preventDefault();
    if (queryAreaRef.current?.value) {
      graphiQLService(endpoint, queryAreaRef.current?.value)
        .then((data) => {
          setResponse(JSON.stringify(data, null, 4));
        })
        .catch((error) => {
          setResponse('Failed to fetch data');
        });
    } else {
      return;
    }
  };

  useEffect(() => {
    if (queryAreaRef.current) {
      queryAreaRef.current.value = '';
    }
  }, [endpoint]);

  return (
    <>
      <div className={classes.wrapper}>
        <Image onClick={handleQuerySubmit} src={searchIcon} alt="search schema" />
        <div className={classes.textareas}>
          <textarea className={classes.queryArea} ref={queryAreaRef} placeholder="Query"></textarea>
          <div className={classes.variablesWrapper}>
            <textarea
              className={classes.variablesArea}
              ref={variablesAreaRef}
              placeholder="Variables"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditorSection;
