"use client";
import { cn } from "@/lib/utils";
import { Logo, LogoIcon } from "./sidebar-component";
import { Sidebar, SidebarBody, SidebarLink } from "../../ui/sidebar";

import { BiLibrary } from "react-icons/bi";
import { CiBellOn, CiPen } from "react-icons/ci";
import { GoGear, GoHome } from "react-icons/go";
import { useState } from "react";

type link = {
  label: string;
  icon: React.ReactElement;
  href: string;
};

type TTopMenuProps = {
  user: string;
  children: React.ReactNode;
};

const links: link[] = [
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

const TopMenu = ({ user, children }: TTopMenuProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen", // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user,
                href: "#",
                icon: <div className="w-10 h-10">{user[0]}</div>,
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
