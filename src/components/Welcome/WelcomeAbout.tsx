import photo1 from '@/../public/photo-ilya.png';
import photo2 from '@/../public/photo-slawa.png';
import photo3 from '@/../public/photo-max.png';
import { useLocaleContext } from '@/context/locale.context';
import WelcomeAboutItem from './WelcomeAboutItem';
import classes from './WelcomeAbout.module.css';

export default function WelcomeAbout() {
  const [locale] = useLocaleContext();
  const {
    home: {
      aboutTitle,
      aboutName1,
      aboutName2,
      aboutName3,
      aboutPosition1,
      aboutPosition2,
      aboutPosition3,
      aboutText1,
      aboutText2,
      aboutText3,
    },
  } = locale;

  return (
    <>
      <h2 className={classes.subtitle}>{aboutTitle}</h2>
      <div className={classes.wrapperAbout}>
        <WelcomeAboutItem
          itemPhoto={photo1}
          itemName={aboutName1}
          itemPosition={aboutPosition1}
          itemText={aboutText1}
        />
        <WelcomeAboutItem
          itemPhoto={photo2}
          itemName={aboutName2}
          itemPosition={aboutPosition2}
          itemText={aboutText2}
        />
        <WelcomeAboutItem
          itemPhoto={photo3}
          itemName={aboutName3}
          itemPosition={aboutPosition3}
          itemText={aboutText3}
        />
      </div>
    </>
  );
}
