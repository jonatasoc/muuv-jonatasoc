import "../styles/globals.css";
import type { AppProps } from "next/app";
import { FavoritesProvider } from "contexts/FavoritesContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FavoritesProvider>
      <Component {...pageProps} />
    </FavoritesProvider>
  );
}

export default MyApp;
