import { useRef } from 'react';
import { useLocaleContext } from '../../context/locale.context';

interface IMainHeaderProps {
  onSubmit: (endpoint: string) => void;
}

function MainHeader({ onSubmit }: IMainHeaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [locale] = useLocaleContext();
  const {
    main: { endpointButton },
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
      <form onSubmit={handleSubmit}>
        <button onClick={handleSubmit}>{endpointButton}</button>
        <input ref={inputRef} type="url" />
      </form>
    </>
  );
}

export default MainHeader;
