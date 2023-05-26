import Link from 'next/link';

import gitHubIcon from '@/../public/github-icon.svg';
import classes from './GitHubLink.module.css';

interface IGitLinksProps {
  gitlink: string;
}

export default function GitHubLink({ gitlink }: IGitLinksProps) {
  return (
    <Link className={classes.socialLink} href={gitlink} target="_blank" rel="noreferrer">
      <img className={classes.githubIcon} src={gitHubIcon.src} alt="github-icon" />
    </Link>
  );
}
