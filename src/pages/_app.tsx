import { type AppType } from "next/app";
import { trpc } from "../utils/trpc";

import MainNavigation from "../components/MainNavigation";
import Footer from "../components/Footer";
import type NavigationItem from "../models/NavigationItem";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const navItems: Array<NavigationItem> = [];
  navItems.push({text: 'Home', url: '/'});
  navItems.push({text: 'Cart', url: '/cart'});
  navItems.push({text: 'Create new product', url: '/new'});

  return(
    <>
      <MainNavigation items={navItems}/>
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default trpc.withTRPC(MyApp);
