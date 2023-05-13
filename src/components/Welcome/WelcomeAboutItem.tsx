import classes from './WelcomeAboutItem.module.css';
import Image, { StaticImageData } from 'next/image';
// import { LOGO_STACK_ITEM_WIDTH, LOGO_STACK_ITEM_HEIGHT } from '@/constants/dimensions';

interface IWelcomeAboutItemProps {
  itemPhoto: StaticImageData;
  itemName: string;
  itemPosition: string;
  itemText: string;
}

export default function WelcomeAboutItem({
  itemPhoto,
  itemName,
  itemPosition,
  itemText,
}: IWelcomeAboutItemProps) {
  return (
    <>
      <div className={classes.wrapperAbout}>
        <Image
          className={classes.aboutPhoto}
          width={200}
          height={200}
          src={itemPhoto}
          alt="developer photo"
          priority={true}
        />
        <div className={classes.aboutTextWrapper}>
          <p className={classes.aboutName}>{itemName}</p>
          <p className={classes.aboutPosition}>{itemPosition}</p>
          <p className={classes.aboutText}>{itemText}</p>
        </div>
      </div>
    </>
  );
}
