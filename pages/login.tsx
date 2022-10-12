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
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { publicKey } = useWallet();
  const { user } = useUser();
  const login = useLogin();
  const programAddress = "GZttphkwJbruZm59cwpCUwxLEek8FMzGEsDPS9ujQ2rN";
  const program = useProgram(programAddress, "nft-drop");
  const { mutate, isLoading } = useClaimNFT(program.data);

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>NFT Gated Website on Solana</h1>
      <WalletMultiButton />
      {publicKey && !user && (
        <button className={styles.button} onClick={() => login()}>
          Login
        </button>
      )}
      {user && (
        <button
          onClick={() =>
            mutate({
              amount: 1,
            })
          }
        >
          {isLoading ? "Claiming..." : "Claim NFT"}
        </button>
      )}

      <Link href="/" passHref>
        <a className={styles.lightPurple}>Protected Page</a>
      </Link>
    </div>
  );
};

export default Home;
