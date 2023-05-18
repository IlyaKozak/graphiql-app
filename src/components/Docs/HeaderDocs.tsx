import { HeaderDocsType } from '@/types/docs';
import cross from '@/../public/cross-small.svg';
import arrow from '@/../public/left-arrow.svg';
import classes from './docs.module.css';

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
          <img className={classes.backArrow} src={arrow.src} alt="back stack" />
          <span className={classes.span_backBtn}>{valueBtnBack}</span>
        </div>
      </div>
      <img
        onClick={handleLableClick}
        className={classes.cross}
        src={cross.src}
        alt="image for close docs"
      />
    </div>
  );
}
