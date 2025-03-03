import { ChevronRight, LogOut, Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import React from "react";

import { Icons } from "@/components/icons";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, getNameInitials, handleLocaleChange } from "@/lib/utils";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  isCollapsed?: boolean;
  isSiteHeader?: boolean;
};

export const UserProfile = ({ isCollapsed, isSiteHeader = false }: Props) => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { setTheme, theme } = useTheme();
  const router = useRouter();

  const { t } = useTranslation("common");

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "group flex flex-row items-center justify-between",
            isCollapsed ? "p-2" : "px-3 py-4",
            isSiteHeader
              ? "rounded-full h-fit w-fit p-0"
              : "rounded-none h-full w-full",
          )}
        >
          {isCollapsed ? (
            <Avatar className="h-10 w-10">
              <AvatarImage src={session?.user?.profileImage ?? undefined} />
              <AvatarFallback>
                {getNameInitials(session?.user.name ?? "UNKNOWN")}
              </AvatarFallback>
            </Avatar>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={session?.user?.profileImage ?? undefined} />
                  <AvatarFallback>
                    {getNameInitials(session?.user.name ?? "UNKNOWN")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-shrink h-full max-w-full flex-grow flex-col items-start">
                  <h4 className="text-sm font-semibold truncate">
                    {session?.user?.name ?? (
                      <Skeleton className="mb-1 h-5 w-40" />
                    )}
                  </h4>
                  <div className="text-xs font-medium text-muted-foreground truncate">
                    {session?.user?.email ?? <Skeleton className="h-4 w-20" />}
                    <Badge
                      className="text-[0.65rem] font-semibold ml-1 px-1 py-0"
                      variant={
                        session?.user?.role === "ADMIN" ? "default" : "outline"
                      }
                    >
                      {session?.user?.role ?? (
                        <Skeleton className="h-full w-full" />
                      )}
                    </Badge>
                  </div>
                </div>
              </div>
              {session?.user && (
                <ChevronRight
                  className={cn(
                    "mx-2 min-w-fit transition-all duration-300 ease-in-out transform",
                    isMenuOpen ? "rotate-90" : "",
                  )}
                />
              )}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="mb-10 w-56"
        side={"right"}
        align="center"
        alignOffset={20}
      >
        <DropdownMenuLabel className="my-auto text-lg">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            {!router.pathname.startsWith("/dashboard") ? (
              <Link href="/dashboard/overview">
                <Icons.home className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link href="/">
                <Icons.home className="mr-2 h-4 w-4" />
                <span>Landing Page</span>
              </Link>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {theme === "light" ? (
              <Icons.sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            ) : (
              <Icons.moon className="mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            )}
            <span>Toggle theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              {theme === "light" && <Icons.check className="mr-2 h-4 w-4" />}
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              {theme === "dark" && <Icons.check className="mr-2 h-4 w-4" />}
              Dark
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setTheme("system")}>
              {theme === "system" && <Icons.check className="mr-2 h-4 w-4" />}
              System
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        {/* --------- */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icons.languages className="mr-2 h-4 w-4" />
            <span>Language</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
                onClick={async () => await handleLocaleChange(router, "ar")}
              >
                {router.locale === "ar" && (
                  <Icons.check className="mr-2 h-4 w-4" />
                )}
                العربية
              </DropdownMenuItem>
              <DropdownMenuItem
                // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
                onClick={async () => await handleLocaleChange(router, "en")}
              >
                {router.locale === "en" && (
                  <Icons.check className="mr-2 h-4 w-4" />
                )}
                English
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <AlertDialogTrigger asChild>
          <DropdownMenuItem className="text-red-800 hover:text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </AlertDialogTrigger>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
