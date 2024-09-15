"use client";
import React, { useState } from "react";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Capitalize } from "@/lib/filterName";
import { getLocalStorage } from "@/lib/localstorage";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { BiLibrary } from "react-icons/bi";
import { CiBellOn, CiPen } from "react-icons/ci";
import { GoGear, GoHome } from "react-icons/go";

type SidebarDemoProps = {
  children: React.ReactNode;
};

type link = {
  label: string;
  icon: React.ReactNode;
  href: string;
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

export default function SideBarFinal({ children }: SidebarDemoProps) {
  const [open, setOpen] = useState(false);

  const [user, setUser] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const id = getLocalStorage("id");
      const res = await fetch(`http://localhost:3000/api/user/${id}`);
      if (!res.ok) throw new Error("Failed to fetch userData");
      const data = await res.json();
      const name = Capitalize(data.firstName) + " " + Capitalize(data.lastName);
      setUser(name);
    };

    fetchData();
  }, []);

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
                icon: (
                  <div>
                    <div className="border border-black w-8 h-8 rounded-full flex items-center justify-center">
                      {user[0]}
                    </div>
                  </div>
                ),
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
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Reader&apos;s&nbsp;Haven
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
