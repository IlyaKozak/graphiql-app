import {
  LOGO_ICON_WELCOME_WIDTH,
  LOGO_ICON_WELCOME_HEIGHT,
  LOGO_GRAPHQL_WIDTH,
  LOGO_GRAPHQL_HEIGHT,
} from '@/constants/dimensions';
import Image from 'next/image';
import classes from './Welcome.module.css';
import logoIcon from '../../../public/logoIcon.svg';
import logoGraphQL from '../../../public/logo-graphQL.svg';

export default function WelcomeLogo() {
  return (
    <>
      <div className={classes.wrapperLogo}>
        <Image
          className={classes.logoGraphQL}
          src={logoGraphQL}
          width={LOGO_GRAPHQL_WIDTH}
          height={LOGO_GRAPHQL_HEIGHT}
          alt="logo welcome"
          priority={true}
        />
        <Image
          className={classes.logoIcon}
          src={logoIcon}
          width={LOGO_ICON_WELCOME_WIDTH}
          height={LOGO_ICON_WELCOME_HEIGHT}
          alt="logo graphQL"
          priority={true}
        />
      </div>
    </>
  );
}
