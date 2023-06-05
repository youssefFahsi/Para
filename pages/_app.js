import React, { useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import Router from "next/router";

NProgress.configure({ showSpinner: false });

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

 

  return <Component {...pageProps} />;
};

export default App;
