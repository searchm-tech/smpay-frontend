"use client";
import { Fragment } from "react";

import DesktopView from "./desktop";
import MobilewView from "./mobile";
import { useWindowSize } from "@/hooks/useWindowSize";

const AdvertiserVerificationView = () => {
  const { device } = useWindowSize();

  return (
    <Fragment>
      {device === "desktop" ? <DesktopView /> : <MobilewView />}
    </Fragment>
  );
};

export default AdvertiserVerificationView;

export type AccountInfo = {
  bank: string;
  accountNumber: string;
  accountHolder: string;
};
