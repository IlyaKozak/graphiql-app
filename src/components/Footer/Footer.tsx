import Link from 'next/link';

import logoRSS from '@/../public/logo-rs-school.svg';
import { GITHUB_LINK_1, GITHUB_LINK_2, GITHUB_LINK_3, RS_SCHOOL_LINK } from '@/constants/links';
import GitHubLink from './GitHubLink/GitHubLink';
import classes from './Footer.module.css';

export default function Footer() {
  return (
    <div className={classes.footerWrapper}>
      <footer className={classes.footer}>
        <div className={classes.github}>
          <GitHubLink gitlink={GITHUB_LINK_1} />
          <GitHubLink gitlink={GITHUB_LINK_2} />
          <GitHubLink gitlink={GITHUB_LINK_3} />
        </div>
        <p>{new Date().getFullYear()}</p>
        <Link href={RS_SCHOOL_LINK} className={classes.socialLink}>
          <img className={classes.logoRS} src={logoRSS.src} alt="rs school logo" />
        </Link>
      </footer>
    </div>
  );
}
