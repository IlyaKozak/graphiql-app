import { useRef } from 'react';

import { useLocaleContext } from '@/context/locale.context';
import LoaderMini from '@/components/LoaderMini/LoaderMini';
import classes from './EndpointSection.module.css';

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
    main: { endpointButton, endpointText, invalidEndpoint },
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
            {endpointText}{' '}
            <strong className={isValidEndpoint ? classes.valid : classes.invalid}>
              {isValidEndpoint ? endpoint : invalidEndpoint}
            </strong>
          </span>
        </div>
      </div>
    </>
  );
}

export default EndpointSection;
