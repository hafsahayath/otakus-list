import { ReactNode } from "react";
import DynamicLink from "./DynamicLink";
import Image from "next/image";

const Navbar = ({ children }: { children: ReactNode }) => {
  return (
    <nav className="flex items-center gap-4 p-6 pl-0 border-b border-base-300 shadow-md rounded-t-lg">
      <DynamicLink
        linkStyles="btn btn-ghost px-0 pl-2 normal-case text-xl hover:bg-transparent"
        href="/"
      >
        <Image src="/otaku.png" alt="logo" width={100} height={100} />
      </DynamicLink>
      <div className="w-full">{children}</div>
      <div className="flex-none">
        <DynamicLink
          href="/watchlist"
          linkStyles="font-bold uppercase hover:underline hover:underline-offset-[15px]"
          linkActiveStyles="underline underline-offset-[15px]"
        >
          Watchlist
        </DynamicLink>
      </div>
    </nav>
  );
};

export default Navbar;
