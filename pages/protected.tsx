import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useLogin, useUser } from "@thirdweb-dev/react/solana";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import type { GetServerSideProps } from "next";
import { FC } from "react";
import { getUser } from "../auth.config";

const programAddress = "Hdk7H3FBM1GkENKEhvYGvxo2b8NJc1wCywDsjbhDFyCW";

interface IProtectedProps {
  hasAccess: boolean;
}

const Protected: FC<IProtectedProps> = ({ hasAccess }) => {
  const { publicKey } = useWallet();
  const { user } = useUser();
  const login = useLogin();

  if (!publicKey) {
    return (
      <div>
        <h1>Protected Page</h1>
        <WalletMultiButton />
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <h1>Protected Page</h1>
        <button onClick={() => login()}>Login</button>
      </div>
    );
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const sdk = ThirdwebSDK.fromNetwork("devnet");

  const user = await getUser(req);

  if (!user) {
    return {
      props: {
        hasAccess: false,
      },
    };
  }

  const program = await sdk.getNFTCollection(programAddress);
  const nfts = await program?.getAllNFTAddresses();
  const balance = await program?.balanceOf(user?.address, nfts ? nfts[0] : "0");

  if (balance && balance > 0) {
    return {
      props: {
        hasAccess: true,
      },
    };
  }
  return {
    props: {
      hasAccess: false,
    },
  };
};
