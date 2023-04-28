import { useRef } from 'react';
import { useLocaleContext } from '../../context/locale.context';
import classes from './MainHeader.module.css';
import searchIcon from '../../../public/search-icon.svg';
import Image from 'next/image';

interface IMainHeaderProps {
  onSubmit: (endpoint: string) => void;
  endpoint: string;
}

function MainHeader({ onSubmit, endpoint }: IMainHeaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [locale] = useLocaleContext();
  const {
    main: { endpointButton, endpointText },
  } = locale;

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (inputRef.current) {
      onSubmit(inputRef.current.value);
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Image src={searchIcon} alt="search schema" />
        <div className={classes.container}>
          <form onSubmit={handleSubmit}>
            <button onClick={handleSubmit} title={endpointButton}>
              {endpointButton}
            </button>
            <input ref={inputRef} type="url" placeholder={endpoint} />
          </form>
          <span>
            {endpointText} <strong>{endpoint}</strong>
          </span>
        </div>
      </div>
    </>
  );
}

export default MainHeader;
