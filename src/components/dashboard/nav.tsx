import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { useRouter } from "next/router";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { type Icon } from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon | Icon;
    variant: "default" | "ghost";
    href: string;
  }[];
}

export default function Nav({ links = [], isCollapsed }: NavProps) {
  const router = useRouter();

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => {
          const isActive = router.pathname === link.href;

          return isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-9 w-9",
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                      isActive && "bg-accent text-white", // Add active styles here
                    )}
                  >
                    <link.icon className="h-6 w-6" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              href={link.href}
              className={cn(
                buttonVariants({ variant: link.variant, size: "lg" }),
                link.variant === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start text-md px-4",
                isActive && "bg-accent text-white", // Add active styles here
              )}
            >
              <link.icon className="mr-4 h-6 w-6" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    link.variant === "default" &&
                      "text-background dark:text-white",
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
