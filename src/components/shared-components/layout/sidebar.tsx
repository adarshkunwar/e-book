import React from "react";
import { GoHome } from "react-icons/go";
import { BiLibrary } from "react-icons/bi";
import { CiPen } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { GoGear } from "react-icons/go";
import Link from "next/link";

type Props = {};

type TTab = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const tabs = [
  {
    name: "Dashboard",
    icon: <GoHome />,
    path: "/",
  },
  {
    name: "Library",
    icon: <BiLibrary />,
    path: "/library",
  },
  {
    name: "Write",
    icon: <CiPen />,
    path: "/write",
  },
  {
    name: "Notification",
    icon: <CiBellOn />,
    path: "/notification",
  },
  {
    name: "Settings",
    icon: <GoGear />,
    path: "/settings",
  },
];

const Sidebar = (props: Props) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="text-5xl">L</div>
      <div className="flex flex-col justify-center gap-10">
        {tabs.map((tab, index) => {
          return (
            <div className="text-4xl" key={index}>
              <Link href={tab.path}>{tab.icon}</Link>
            </div>
          );
        })}
      </div>
      <div className="text-5xl">L</div>
    </div>
  );
};

export default Sidebar;
