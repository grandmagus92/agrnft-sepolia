import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Ccr from "../components/ccr";


const activeChain = "sepolia";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
    >
      <Navbar/>
      <Component {...pageProps} />
      <Ccr/>
    </ThirdwebProvider>
  );
}

export default MyApp;
