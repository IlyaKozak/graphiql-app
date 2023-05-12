import Image from 'next/image';
import Link from 'next/link';
import gitHubIcon from '../../../../public/github-icon.svg';
import classes from './GitHubLink.module.css';

interface IGitLinksProps {
  gitlink: string;
}

export default function GitHubLink({ gitlink }: IGitLinksProps) {
  return (
    <Link className={classes.socialLink} href={gitlink} target="_blank" rel="noreferrer">
      <Image className={classes.githubIcon} src={gitHubIcon} alt="github-icon" />
    </Link>
  );
}
