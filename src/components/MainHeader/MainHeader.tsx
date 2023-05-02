import classes from './MainHeader.module.css';
import SingOut from '../Auth/SignOut';
import logo from '../../../public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import SwitchLocale from '../SwitchLocale/SwitchLocale';

function MainHeader() {
  return (
    <>
      <div className={classes.wrapper}>
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
        <div className={classes.headerButtons}>
          <SwitchLocale />
          <SingOut />
        </div>
      </div>
    </>
  );
}

export default MainHeader;
