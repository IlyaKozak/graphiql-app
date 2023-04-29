import { useEffect, useState } from 'react';
import classes from './ResponseSection.module.css';

interface IResponseSectionProps {
  response: string | null;
}

function ResponseSection({ response }: IResponseSectionProps) {
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    setCode(response);
  }, [response]);

  return (
    <>
      <pre className={classes.wrapper}>
        <code>{code}</code>
      </pre>
    </>
  );
}

export default ResponseSection;
