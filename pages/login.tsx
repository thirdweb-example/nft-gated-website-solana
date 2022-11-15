import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  useClaimNFT,
  useLogin,
  useProgram,
  useUser,
} from "@thirdweb-dev/react/solana";
import type { NextPage } from "next";
import Link from "next/link";
import { programAddress } from "../const/yourDetails";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { publicKey } = useWallet();
  const { user, isLoading: userLoading } = useUser();
  const login = useLogin();
  const program = useProgram(programAddress, "nft-drop");
  const { mutate, isLoading } = useClaimNFT(program.data);

  if (userLoading) return <></>;

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>NFT Gated Website on Solana</h1>
      {!publicKey && <WalletMultiButton />}
      {publicKey && !user && (
        <button className={styles.button} onClick={() => login()}>
          Login
        </button>
      )}

      {user && <p>Logged in as {user.address} </p>}

      {user && (
        <button
          onClick={() =>
            mutate({
              amount: 1,
            })
          }
          className={styles.button}
        >
          {isLoading ? "Claiming..." : "Claim NFT"}
        </button>
      )}

      <Link href="/" passHref className={styles.lightPurple}>
        Protected Page
      </Link>
    </div>
  );
};

export default Home;
