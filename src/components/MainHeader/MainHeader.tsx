import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import logo from '@/../public/logo.svg';
import logoIcon from '@/../public/logoIcon.svg';
import { INITIAL_RESOLUTION, BORDER_RESOLUTION } from '@/constants/resolutions';
import { LOGO_WIDTH, LOGO_ICON_WIDTH, LOGO_HEIGHT, LOGO_ICON_HEIGHT } from '@/constants/dimensions';
import SingOut from '@/components/Auth/SignOut';
import SwitchLocale from '@/components/SwitchLocale/SwitchLocale';
import WelcomeHeader from '@/components/Welcome/WelcomeHeader';
import { scrollHandler, resizeHandler } from './Handlers';
import classes from './MainHeader.module.css';

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
          <img
            src={width < BORDER_RESOLUTION ? logoIcon.src : logo.src}
            width={width < BORDER_RESOLUTION ? LOGO_ICON_WIDTH : LOGO_WIDTH}
            height={width < BORDER_RESOLUTION ? LOGO_ICON_HEIGHT : LOGO_HEIGHT}
            alt="logo"
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
