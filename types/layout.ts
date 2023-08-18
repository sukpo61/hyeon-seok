import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface BottomIconProps {
  selected: boolean;
}

export type { NextPageWithLayout, BottomIconProps };
