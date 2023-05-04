import classes from './MainHeader.module.css';
import SingOut from '../Auth/SignOut';
import logo from '../../../public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SwitchLocale from '../SwitchLocale/SwitchLocale';
import WelcomeHeader from '../Welcome/WelcomeHeader';

function MainHeader() {
  const { asPath } = useRouter();

  return (
    <>
      <div className={classes.wrapper}>
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
        <div className={classes.headerButtons}>
          <SwitchLocale />
          {asPath === '/' && <WelcomeHeader />}
          <SingOut />
        </div>
      </div>
    </>
  );
}

export default MainHeader;
