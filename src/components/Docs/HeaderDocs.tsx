import classes from './docs.module.css';
import Image from 'next/image';
import cross from '../../../public/cross-small.svg';
import arrow from '../../../public/left-arrow.svg';
import { HeaderDocsType } from '@/types/docs';

export function HeaderDocs({
  showBtnBack,
  valueBtnBack,
  hadleClickBack,
  handleLableClick,
}: HeaderDocsType) {
  return (
    <div className={classes.headerDocs}>
      <div className={classes.backBtn}>
        <div
          onClick={hadleClickBack}
          className={showBtnBack ? classes.backShow : classes.backHidden}
        >
          <Image className={classes.backArrow} src={arrow} alt="back stack" />
          <span className={classes.span_backBtn}>{valueBtnBack}</span>
        </div>
      </div>
      <Image
        onClick={handleLableClick}
        className={classes.cross}
        src={cross}
        alt="image for close docs"
      />
    </div>
  );
}
