import { UserProfile } from "@/components/core/user-profile";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const HIDE_THRESHOLD = 0.005;

const SiteHeader = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const direction = current - (scrollYProgress.getPrevious() ?? 0);

    if (scrollYProgress.get() >= 0.05) {
      if (direction < 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
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
          "flex justify-between items-center lg:text-xl md:text-lg sm:px-6 px-5 sm:py-1 py-2 hover:px-7",
          "select-none bg-background outline outline-2 outline-border hover:outline-none hover:bg-accent",
          "h-fit z-50 transition-all duration-200 shadow-lg fixed sm:inset-x-0 inset-x-4 mx-auto sm:w-fit min-w-[20%] top-4 rounded-lg ",
        )}
      >
        <Icons.logo
          className="sm:h-16 h-14 sm:w-16 w-14 cursor-pointer"
          onClick={() => router.push("/")}
        />
        <ul
          className={cn(
            "flex flex-row items-center text-center justify-center gap-1 w-full",
          )}
        >
          <Button
            className="text-2xl sm:px-3 sm:text-base"
            variant="link"
            asChild
          >
            <Link href="#about-us">
              <Icons.aboutUs className="block sm:hidden text-3xl" />
              <span className="hidden sm:block text-sm">About Us</span>
            </Link>
          </Button>
          <Button
            className="text-2xl sm:px-3 sm:text-base"
            variant="link"
            asChild
          >
            <Link href="#events">
              <Icons.events className="block sm:hidden text-3xl" />
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
          <UserProfile isSiteHeader isCollapsed />
        )}
      </motion.nav>
    </AnimatePresence>
  );
};

export default SiteHeader;
