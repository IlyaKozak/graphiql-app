import Link from 'next/link';
import classes from './Welcome.module.css';
import Image, { StaticImageData } from 'next/image';
import { LOGO_STACK_ITEM_WIDTH, LOGO_STACK_ITEM_HEIGHT } from '@/constants/dimensions';

interface IWelcomeStackItemProps {
  itemLink: string;
  itemIcon: StaticImageData;
}

export default function WelcomeStackItem({ itemLink, itemIcon }: IWelcomeStackItemProps) {
  return (
    <Link className={classes.itemLink} href={itemLink} target="_blank" rel="noreferrer">
      <Image
        className={classes.itemIcon}
        width={LOGO_STACK_ITEM_WIDTH}
        height={LOGO_STACK_ITEM_HEIGHT}
        src={itemIcon}
        alt="item icon"
        priority={true}
      />
    </Link>
  );
}
