import classes from './ErrorToast.module.css';
import Image from 'next/image';
import closeToast from '../../../public/close-toast.svg';
import { Dispatch, SetStateAction, useEffect } from 'react';

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
      <Image
        onClick={() => setShowToast(false)}
        className={classes.imageToast}
        src={closeToast}
        alt="image cross show error"
      />
      <span>{errorMessageToast}</span>
    </div>
  );
}
