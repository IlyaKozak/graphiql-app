import Link from 'next/link';
import classes from './ButtonWithLink.module.css';

interface IButtonWithLinkProps {
  itemLink: string;
  itemText: string;
  paddingTopBottom: number;
  paddingLeftRight: number;
  backgroundColor?: string;
}

export default function ButtonWithLink({
  itemLink,
  itemText,
  paddingTopBottom,
  paddingLeftRight,
  backgroundColor,
}: IButtonWithLinkProps) {
  const buttonStyle = {
    padding: `${paddingTopBottom}px ${paddingLeftRight}px`,
    backgroundColor: `${backgroundColor ? backgroundColor : ''}`,
  };
  return (
    <Link className={classes.itemLink} href={itemLink}>
      <div className={`${classes.wrapperButton} ${classes.itemClass}`} style={buttonStyle}>
        {itemText}
      </div>
    </Link>
  );
}
