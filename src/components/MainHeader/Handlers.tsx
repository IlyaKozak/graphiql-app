import classes from './MainHeader.module.css';

import { Dispatch, SetStateAction } from 'react';

export const scrollHandler = ({ dispatch }: { dispatch: Dispatch<SetStateAction<string>> }) => {
  if (window.scrollY > 0) {
    dispatch(classes.wrapperScrollable);
  } else {
    dispatch(classes.wrapper);
  }
};

export const resizeHandler = ({ dispatch }: { dispatch: Dispatch<SetStateAction<number>> }) => {
  dispatch(window.innerWidth);
};
