import { Dispatch, SetStateAction, useEffect } from 'react';

import closeToast from '@/../public/close-toast.svg';
import classes from './ErrorToast.module.css';

type ErrorToastType = {
  showToast: boolean;
  setShowToast: Dispatch<SetStateAction<boolean>>;
  errorMessageToast: string;
};

export function ErrorToast({ showToast, setShowToast, errorMessageToast }: ErrorToastType) {
  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [showToast, setShowToast]);

  return (
    <div className={showToast ? classes.wrapperErrorToastShow : classes.wrapperErrorToastHidden}>
      <img
        onClick={() => setShowToast(false)}
        className={classes.imageToast}
        src={closeToast.src}
        alt="image cross show error"
      />
      <span>{errorMessageToast}</span>
    </div>
  );
}
