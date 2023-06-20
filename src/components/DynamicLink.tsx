"use client";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";

const DynamicLink = ({
  href,
  children,
  linkStyles,
  linkActiveStyles,
}: {
  href: string;
  children: string | ReactNode;
  linkStyles?: string;
  linkActiveStyles?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      className={`${linkStyles} ${
        pathname === href && linkActiveStyles ? linkActiveStyles : ""
      }`}
      onClick={(e) => {
        e.preventDefault();
        router.replace(href);
        router.refresh();
      }}
    >
      {children}
    </button>
  );
};

export default DynamicLink;
