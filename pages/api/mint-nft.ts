import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../../auth.config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUser(req);

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  const { name, description, image } = JSON.parse(req.body);
  const sdk = ThirdwebSDK.fromPrivateKey("devnet", process.env.PRIVATE_KEY!);
  const program = await sdk.getNFTCollection(
    "Hdk7H3FBM1GkENKEhvYGvxo2b8NJc1wCywDsjbhDFyCW"
  );

  const metadata = {
    name,
    description,
    image,
  };

  const address = await program.mintTo(user.address, metadata);

  return res.status(200).json({ address });
};

export default handler;
