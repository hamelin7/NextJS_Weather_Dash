import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" passHref>
          <a>
            <Image src="/logo.png" alt="Weather Wiz Logo" width={100} height={50} />
          </a>
        </Link>
      </div>
      <h1 className={styles.title}>Weather Wiz!</h1>
      <nav>
        <Link href="/" passHref>
          <a className={styles.ctaButton}>Home</a>
        </Link>
        <br />
        <Link href="/weather" passHref>
          <a className={styles.ctaButton}>Weather Dashboard</a>
        </Link>
      </nav>
    </header>
  );
}
