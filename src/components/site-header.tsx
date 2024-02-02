import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserNav } from "./user-nav";
import { useSession } from "next-auth/react";
import { Icons } from "@/components/icons";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

type Props = {
  // ...
};

const SiteHeader = (props: Props) => {
  const { data: session } = useSession();
  const router = useRouter();

  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const direction = current - (scrollYProgress.getPrevious() ?? 0);

    if (direction < 0) {
      setVisible(true);
    } else if (direction > 0.00025) {
      setVisible(false);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.1,
        }}
        className={cn(
          // "flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4",
          // className,
          "flex justify-between items-center lg:text-xl md:text-lg sm:px-6 px-5 sm:py-1 py-2 hover:px-7 bg-background outline outline-2 outline-border hover:outline-none hover:bg-accent",
          "select-none h-fit z-50 transition-all duration-200 shadow-lg fixed sm:inset-x-0 inset-x-4 mx-auto sm:w-fit min-w-[20%] top-4 rounded-lg ",
        )}
      >
        <Icons.logo className="sm:h-16 h-14 sm:w-16 w-14 cursor-pointer sm:mr-4" />
        <ul
          className={cn(
            "flex flex-row items-center text-center justify-center w-full",
            // sideMenuOpen ? "active" : "",
          )}
        >
          <Button
            className="text-2xl sm:px-3 sm:text-base"
            variant="link"
            asChild
          >
            <Link href="#about-us">
              <Icons.aboutUs className="block sm:hidden" />
              <span className="hidden sm:block text-sm">About Us</span>
            </Link>
          </Button>
          <Button
            className="text-2xl sm:px-3 sm:text-base"
            variant="link"
            asChild
          >
            <Link href="#events">
              <Icons.events className="block sm:hidden" />
              <span className="hidden sm:block text-sm">Events</span>
            </Link>
          </Button>
        </ul>
        {/* login button */}
        {!session?.user ? (
          <Button
            variant="default"
            className="hidden sm:block"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </Button>
        ) : (
          <UserNav />
        )}
      </motion.nav>
    </AnimatePresence>
  );
};

export default SiteHeader;
