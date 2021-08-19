import React, { useEffect } from "react";
import { AppProps } from "next/app";
import { LoadingIndicator } from "../../src/components/LoadingIndicator";
import { discriminationTheme } from "../../src/utils/theme";
import "swiper/swiper.scss";
import "../../src/styles/reset.css";
import "../../src/styles/coolicons.css";
import "../../src/styles/style.scss";
import "../../src/styles/package.scss";
const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  useEffect(() => {
    discriminationTheme();
  }, []);
  return (
    <React.Fragment>
      <Component {...pageProps} />
      <LoadingIndicator />
    </React.Fragment>
  );
};
export default App;
