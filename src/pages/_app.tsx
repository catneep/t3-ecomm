import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import MainNavigation from "../components/MainNavigation";
import NavigationItem from "../models/NavigationItem";

const MyApp: AppType = ({ Component, pageProps }) => {
  const navItems: Array<NavigationItem> = [];

  return(
    <>
      <MainNavigation items={navItems}/>
      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(MyApp);
