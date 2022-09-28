import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const Home: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <img src="/thirdweb.svg" className={styles.icon} />
          <img src="/sol.png" className={styles.icon} />
        </div>
        <h1 className={styles.h1}>Solana, meet thirdweb 👋</h1>
        <p className={styles.explain}>
          Explore what you can do with thirdweb&rsquo;s brand new{" "}
          <b>
            <a
              href="https://portal.thirdweb.com/solana"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.lightPurple}
            >
              Solana SDK
            </a>
          </b>
          .
        </p>

        <a href="/protected" className={styles.lightPurple}>
          Protected Page
        </a>

        <WalletMultiButton />
      </div>
    </>
  );
};

export default Home;
