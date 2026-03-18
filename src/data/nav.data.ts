import type { NavItems } from "#/@types/nav.type";
import {
  BookIcon,
  CompassIcon,
  UserRoundIcon,
  HomeIcon,
  HeadphonesIcon,
  Mic2Icon,
  BookOpen,
  PenIcon,
} from "lucide-react";

export const navItems: NavItems = [
  {
    name: "Home",
    href: "https://learntestuse.vn/",
    icon: HomeIcon,
  },
  {
    name: "Skills",
    // href: "/skills",
    icon: CompassIcon,
    children: [
      {
        name: "Listening",
        href: "/demo/skills",
        icon: HeadphonesIcon,
      },
      {
        name: "Speaking",
        href: "/demo/skills",
        icon: Mic2Icon,
      },
      {
        name: "Reading",
        href: "/demo/skills",
        icon: BookOpen,
      },
      {
        name: "Writing",
        href: "/demo/skills",
        icon: PenIcon,
      },
    ],
  },
  {
    name: "All Courses",
    href: "/courses",
    icon: BookIcon,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: UserRoundIcon,
  },
];
