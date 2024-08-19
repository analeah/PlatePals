"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./navbar.module.css";
import SignIn from "./sign-in";
import { onAuthStateChangedHelper } from "@/utilities/firebase/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

export default function Navbar() {
  // Init user state
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  });

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Image width={40} height={40}
          src="/plate-pals-logo.svg" alt="PlatePals Logo" />
      </Link>
      {
        // TODO
      }
      <SignIn user={user} />
    </nav>
  );
}