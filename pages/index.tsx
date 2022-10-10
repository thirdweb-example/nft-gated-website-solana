import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useLogin, useUser } from "@thirdweb-dev/react/solana";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [name, setName] = useState("test nft");
  const [description, setDescription] = useState("some description");
  const [image, setImage] = useState(
    "https://avatars.githubusercontent.com/u/76690419?v=4"
  );
  const [loading, setLoading] = useState(false);
  const [mintedAddress, setMintedAddress] = useState("");

  const { publicKey } = useWallet();
  const { user } = useUser();
  const login = useLogin();

  const mintNFT = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/mint-nft", {
        method: "POST",
        body: JSON.stringify({
          name,
          description,
          image,
        }),
      });
      const data = await response.json();
      setMintedAddress(data.address);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <img src="/thirdweb.svg" className={styles.icon} />
        <img src="/sol.png" className={styles.icon} />
      </div>
      <h1 className={styles.h1}>NFT Gated Website on Solana</h1>
      <input
        className={styles.input}
        placeholder="Enter name for your NFT"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Enter description for your NFT"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className={styles.input}
        placeholder="Enter image for your NFT"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <WalletMultiButton />
      {publicKey && !user && (
        <button className={styles.button} onClick={() => login()}>
          Login
        </button>
      )}
      {user && (
        <>
          {loading ? (
            <button className={styles.button} disabled>
              Minting NFT
            </button>
          ) : (
            <button className={styles.button} onClick={mintNFT}>
              Mint NFT
            </button>
          )}
        </>
      )}
      {mintedAddress && (
        <a
          href={`https://explorer.solana.com/address/${mintedAddress}?cluster=devnet`}
          target="_blank"
          rel="noreferrer"
        >
          <button className={styles.button}>View NFT</button>
        </a>
      )}

      <Link href="/protected" passHref>
        <a className={styles.lightPurple}>Protected Page</a>
      </Link>
    </div>
  );
};

export default Home;
