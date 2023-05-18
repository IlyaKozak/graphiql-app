import Link from 'next/link';
import { StaticImageData } from 'next/image';

import { LOGO_STACK_ITEM_WIDTH, LOGO_STACK_ITEM_HEIGHT } from '@/constants/dimensions';
import classes from './Welcome.module.css';

interface IWelcomeStackItemProps {
  itemLink: string;
  itemIcon: StaticImageData;
}

export default function WelcomeStackItem({ itemLink, itemIcon }: IWelcomeStackItemProps) {
  return (
    <Link className={classes.itemLink} href={itemLink} target="_blank" rel="noreferrer">
      <img
        className={classes.itemIcon}
        width={LOGO_STACK_ITEM_WIDTH}
        height={LOGO_STACK_ITEM_HEIGHT}
        src={itemIcon.src}
        alt="item icon"
      />
    </Link>
  );
}
