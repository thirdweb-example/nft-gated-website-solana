import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "@thirdweb-dev/react/solana";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Protected: NextPage = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: program } = useProgram(
    "EM4cqegRFnZbxeHJNxefWzG1vkpPuzjofaHD3UDzq46v",
    "nft-collection"
  );
  const { publicKey } = useWallet();

  useEffect(() => {
    const getBalance = async () => {
      setLoading(true);
      const nfts = await program?.getAllNFTAddresses();
      const balance = await program?.balance(nfts ? nfts[0] : "0");
      if (balance && balance > 0) {
        setHasAccess(true);
      }
      setLoading(false);
    };
    getBalance();
  }, [program, publicKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {hasAccess ? (
        <div>
          <h1>Protected Page</h1>
          <p>You have access to this page</p>
        </div>
      ) : (
        <div>
          <h1>Protected Page</h1>
          <p>You do not have access to this page</p>
        </div>
      )}
    </>
  );
};

export default Protected;
