import { BiLibrary } from "react-icons/bi";
import { CiPen, CiBellOn } from "react-icons/ci";
import { GoHome, GoGear } from "react-icons/go";

type link = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

export const links: link[] = [
  {
    label: "Dashboard",
    icon: <GoHome />,
    href: "/",
  },
  {
    label: "Library",
    icon: <BiLibrary />,
    href: "/library",
  },
  {
    label: "Write",
    icon: <CiPen />,
    href: "/write",
  },
  {
    label: "Notification",
    icon: <CiBellOn />,
    href: "/notification",
  },
  {
    label: "Settings",
    icon: <GoGear />,
    href: "/settings",
  },
];
