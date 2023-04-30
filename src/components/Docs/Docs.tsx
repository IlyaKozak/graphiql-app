import HeaderDocs from './HeaderDocs';
import MainDocs from './MainDocs';
import { DocsType } from '../../types/docs';
import classes from './docs.module.css';

export default function Docs({ schema }: DocsType) {
  return (
    <div className={classes.wrapper}>
      <HeaderDocs header={''} />
      <MainDocs schema={schema} />
    </div>
  );
}
