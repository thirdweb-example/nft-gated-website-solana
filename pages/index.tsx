import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import type { GetServerSideProps } from "next";
import { getUser } from "../auth.config";
import { programAddress } from "../const/yourDetails";

const Protected = () => {
  return (
    <div>
      <h1>Protected Page</h1>
      <p>You have access to this page</p>
    </div>
  );
};

export default Protected;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const sdk = ThirdwebSDK.fromNetwork("devnet");

  const user = await getUser(req);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const program = await sdk.getNFTDrop(programAddress);
  const nfts = await program?.getAllClaimed();

  const hasNFT = nfts?.some((nft) => nft.owner === user.address);

  if (!hasNFT) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
