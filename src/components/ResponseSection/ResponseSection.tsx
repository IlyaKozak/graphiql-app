import { useEffect, useState } from 'react';

import jsonHighlight from '@/utils/jsonHighlight';
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
        {code && <code dangerouslySetInnerHTML={{ __html: jsonHighlight(code) }}></code>}
      </pre>
    </>
  );
}

export default ResponseSection;
