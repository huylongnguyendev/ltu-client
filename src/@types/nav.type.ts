import type { ElementType } from "react";

export interface NavItem {
  name: string;
  href?: string;
  children?: NavItem[];
  icon: ElementType;
}

export type NavItems = NavItem[];