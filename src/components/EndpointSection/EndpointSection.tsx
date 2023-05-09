import { useRef } from 'react';
import { useLocaleContext } from '../../context/locale.context';
import classes from './EndpointSection.module.css';
import LoaderMini from '../LoaderMini/LoaderMini';

interface IEndpointSectionProps {
  onEndpointSubmit: (endpoint: string) => void;
  endpoint: string;
  isLoadingSchema: boolean;
  isValidEndpoint: boolean;
}

function EndpointSection({
  onEndpointSubmit,
  endpoint,
  isLoadingSchema,
  isValidEndpoint,
}: IEndpointSectionProps) {
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
            <input ref={inputRef} type="url" placeholder={endpoint} />
            {isLoadingSchema ? (
              <div className={classes.wrapperBtnLoader}>
                <LoaderMini />
              </div>
            ) : (
              <button onClick={handleEndpointSubmit} title={endpointButton}>
                {endpointButton}
              </button>
            )}
          </form>
          <span className={classes.spanEndpoint}>
            {endpointText} <strong>{isValidEndpoint ? endpoint : 'You Sucks'}</strong>
          </span>
        </div>
      </div>
    </>
  );
}

export default EndpointSection;
