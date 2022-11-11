import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import MainNavigation from "../components/MainNavigation";
import type NavigationItem from "../models/NavigationItem";

const MyApp: AppType = ({ Component, pageProps }) => {
  const navItems: Array<NavigationItem> = [];
  navItems.push({text: 'Home', url: '/'});
  navItems.push({text: 'Cart', url: '/cart'});
  navItems.push({text: 'Create new product', url: '/new'});

  return(
    <>
      <MainNavigation items={navItems}/>
      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(MyApp);
