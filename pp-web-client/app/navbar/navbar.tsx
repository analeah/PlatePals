import Image from "next/image";
import Link from "next/link";

import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Image width={40} height={40}
          src="/plate-pals-logo.svg" alt="PlatePals Logo" />
      </Link>
    </nav>
  );
}