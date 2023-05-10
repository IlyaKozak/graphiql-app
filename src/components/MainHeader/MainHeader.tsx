import classes from './MainHeader.module.css';
import SingOut from '../Auth/SignOut';
import logo from '../../../public/logo.svg';
import logoIcon from '../../../public/logoIcon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { scrollHandler, resizeHandler } from './Handlers';
import { INITIAL_RESOLUTION, BORDER_RESOLUTION } from '../../constants/resolutions';
import {
  LOGO_WIDTH,
  LOGOICON_WIDTH,
  LOGO_HEIGHT,
  LOGOICON_HEIGHT,
} from '../../constants/dimensions';

import SwitchLocale from '../SwitchLocale/SwitchLocale';
import WelcomeHeader from '../Welcome/WelcomeHeader';
import { useEffect, useState } from 'react';

function MainHeader() {
  const [wrapperClass, setWrapperClass] = useState(classes.wrapper);
  const { asPath } = useRouter();
  const [width, setWidth] = useState(INITIAL_RESOLUTION);

  useEffect(() => {
    window.addEventListener('scroll', () => scrollHandler({ dispatch: setWrapperClass }));
    return () => {
      window.removeEventListener('scroll', () => scrollHandler({ dispatch: setWrapperClass }));
    };
  });

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', () => resizeHandler({ dispatch: setWidth }));
    return () => {
      window.removeEventListener('resize', () => resizeHandler({ dispatch: setWidth }));
    };
  }, []);

  return (
    <>
      <div className={wrapperClass}>
        <Link href="/">
          <Image
            src={width < BORDER_RESOLUTION ? logoIcon : logo}
            width={width < BORDER_RESOLUTION ? LOGOICON_WIDTH : LOGO_WIDTH}
            height={width < BORDER_RESOLUTION ? LOGOICON_HEIGHT : LOGO_HEIGHT}
            alt="logo"
            priority={true}
          />
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
