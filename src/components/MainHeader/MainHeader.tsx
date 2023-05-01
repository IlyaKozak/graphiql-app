import classes from './MainHeader.module.css';
import SingOut from '../Auth/SignOut';
import logo from '../../../public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

function MainHeader() {
  return (
    <>
      <div className={classes.wrapper}>
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
        <SingOut />
      </div>
    </>
  );
}

export default MainHeader;
