import HeaderDocs from './HeaderDocs';
import MainDocs from './MainDocs';
import { DocsType } from '../../types/docs';

export default function Docs({ schema }: DocsType) {
  return (
    <div className="">
      <HeaderDocs header={''} />
      <MainDocs schema={schema} />
    </div>
  );
}
