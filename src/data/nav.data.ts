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
    href: "/skills",
    icon: CompassIcon,
    children: [
      {
        name: "Listening",
        icon: HeadphonesIcon,
      },
      {
        name: "Speaking",
        href: "/skills/speaking",
        icon: Mic2Icon,
      },
      {
        name: "Reading",
        href: "/skills/reading",
        icon: BookOpen,
      },
      {
        name: "Writing",
        href: "/skills/writing",
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
