import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ThirdwebProvider } from "@thirdweb-dev/react/solana";
import { Network } from "@thirdweb-dev/sdk/solana";
import type { AppProps } from "next/app";
import "../styles/globals.css";
require("@solana/wallet-adapter-react-ui/styles.css");

const network: Network = "devnet";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletModalProvider>
      <ThirdwebProvider
        authConfig={{
          authUrl: "/api/auth",
          domain: "example.org",
          loginRedirect: "/",
        }}
        network={network}
      >
        <Component {...pageProps} />
      </ThirdwebProvider>
    </WalletModalProvider>
  );
}

export default MyApp;
