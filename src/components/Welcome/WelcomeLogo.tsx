import logoIcon from '@/../public/logoIcon.svg';
import logoGraphQL from '@/../public/logo-graphQL.svg';
import {
  LOGO_ICON_WELCOME_WIDTH,
  LOGO_ICON_WELCOME_HEIGHT,
  LOGO_GRAPHQL_WIDTH,
  LOGO_GRAPHQL_HEIGHT,
} from '@/constants/dimensions';
import classes from './Welcome.module.css';

export default function WelcomeLogo() {
  return (
    <>
      <div className={classes.wrapperLogo}>
        <img
          className={classes.logoGraphQL}
          src={logoGraphQL.src}
          width={LOGO_GRAPHQL_WIDTH}
          height={LOGO_GRAPHQL_HEIGHT}
          alt="logo welcome"
        />
        <img
          className={classes.logoIcon}
          src={logoIcon.src}
          width={LOGO_ICON_WELCOME_WIDTH}
          height={LOGO_ICON_WELCOME_HEIGHT}
          alt="logo graphQL"
        />
      </div>
    </>
  );
}
