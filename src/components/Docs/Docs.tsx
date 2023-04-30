import HeaderDocs from './HeaderDocs';
import MainDocs from './MainDocs';
import { DocsType } from '../../types/docs';
import styles from './docs.module.css';
import { useState } from 'react';

export default function Docs({ schema }: DocsType) {
  const [active, setActive] = useState(false);

  const handleLableClick = () => {
    if (!active) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  return (
    <div className={active ? styles.docsVisible : styles.docsInvisible}>
      <div onClick={handleLableClick} className={styles.lable}>
        DOCS
      </div>
      <HeaderDocs header={''} />
      <MainDocs schema={schema} />
    </div>
  );
}
