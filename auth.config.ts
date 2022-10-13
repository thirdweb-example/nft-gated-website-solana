import { ThirdwebAuth } from "@thirdweb-dev/auth/next/solana";
import { domainName } from "./const/yourDetails";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  privateKey: process.env.PRIVATE_KEY as string,
  domain: domainName,
});
