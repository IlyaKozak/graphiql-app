import { useRef } from 'react';
import { useLocaleContext } from '../../context/locale.context';
import classes from './MainHeader.module.css';

interface IMainHeaderProps {
  onEndpointSubmit: (endpoint: string) => void;
  endpoint: string;
}

function MainHeader({ onEndpointSubmit, endpoint }: IMainHeaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [locale] = useLocaleContext();
  const {
    main: { endpointButton, endpointText },
  } = locale;

  const handleEndpointSubmit = (
    event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (inputRef.current) {
      onEndpointSubmit(inputRef.current.value);
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <form onSubmit={handleEndpointSubmit}>
            <button onClick={handleEndpointSubmit} title={endpointButton}>
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