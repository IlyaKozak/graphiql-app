import classes from './Welcome.module.css';
import WelcomeStackItem from './WelcomeStackItem';
import { useLocaleContext } from '@/context/locale.context';
import {
  REACT_LINK,
  NEXT_LINK,
  TS_LINK,
  FIREBASE_LINK,
  HTML_LINK,
  CSS_LINK,
} from '../../constants/links';
import reactIcon from '../../../public/react.png';
import nextJSIcon from '../../../public/nextjs.svg';
import typescriptIcon from '../../../public/ts.png';
import firebaseIcon from '../../../public/firebase.png';
import htmlIcon from '../../../public/html5.png';
import cssIcon from '../../../public/css3.png';

export default function WelcomeStack() {
  const [locale] = useLocaleContext();
  const {
    home: { stack },
  } = locale;

  return (
    <>
      <h3 className={classes.subtitle}>{stack}</h3>
      <div className={classes.wrapperStack}>
        <WelcomeStackItem itemLink={REACT_LINK} itemIcon={reactIcon} />
        <WelcomeStackItem itemLink={NEXT_LINK} itemIcon={nextJSIcon} />
        <WelcomeStackItem itemLink={TS_LINK} itemIcon={typescriptIcon} />
        <WelcomeStackItem itemLink={FIREBASE_LINK} itemIcon={firebaseIcon} />
        <WelcomeStackItem itemLink={HTML_LINK} itemIcon={htmlIcon} />
        <WelcomeStackItem itemLink={CSS_LINK} itemIcon={cssIcon} />
      </div>
    </>
  );
}
