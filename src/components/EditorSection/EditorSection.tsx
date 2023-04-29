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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleQuerySubmit = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.preventDefault();
    if (textAreaRef.current?.value) {
      graphiQLService(endpoint, textAreaRef.current?.value)
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
    if (textAreaRef.current) {
      textAreaRef.current.value = '';
    }
  }, [endpoint]);

  return (
    <>
      <div className={classes.wrapper}>
        <Image onClick={handleQuerySubmit} src={searchIcon} alt="search schema" />
        <textarea rows={30} ref={textAreaRef} className={classes.textarea}></textarea>
      </div>
    </>
  );
}

export default EditorSection;
