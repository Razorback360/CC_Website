import React from "react";
import {
  ChevronRight,
  Languages,
  LogOut,
  PlusCircle,
  Settings,
  User,
} from "lucide-react";
import { useSession } from "next-auth/react";

import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useTranslation } from "next-i18next";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn, handleLocaleChange } from "@/lib/utils";
import { useRouter } from "next/router";

type Props = {
  isCollapsed?: boolean;
};

export const UserProfile = ({ isCollapsed }: Props) => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  const { t } = useTranslation("common");

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "group flex h-full w-full flex-row items-center justify-between rounded-none",
            isCollapsed ? "p-1 " : "p-2",
          )}
        >
          {isCollapsed ? (
            <Avatar className="h-12 w-12">
              <AvatarImage src={session?.user?.image ?? undefined} />
              <AvatarFallback>
                <Skeleton className="group-hover:border" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={session?.user?.image ?? undefined} />
                  <AvatarFallback>
                    <Skeleton className="group-hover:border" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-shrink h-full max-w-full flex-grow flex-col items-start">
                  <h4 className="text-sm font-semibold truncate">
                    {session?.user?.name ?? (
                      <Skeleton className="mb-1 h-5 w-40" />
                    )}
                  </h4>
                  <div className="text-xs font-medium">
                    {session?.user?.email ?? <Skeleton className="h-4 w-20" />}
                  </div>
                </div>
              </div>
              {session?.user && (
                <ChevronRight
                  className={cn(
                    "transition-all duration-300 ease-in-out transform",
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
        <div className="flex flex-row justify-between">
          <DropdownMenuLabel className="my-auto text-lg">
            My Account
          </DropdownMenuLabel>
          <ThemeToggle />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Languages className="mr-2 h-4 w-4" />
            <span>Language</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
                onClick={async () => await handleLocaleChange(router, "ar")}
                className="cursor-pointer"
              >
                العربية
              </DropdownMenuItem>
              <DropdownMenuItem
                // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
                onClick={async () => await handleLocaleChange(router, "en")}
                className="cursor-pointer"
              >
                English
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>More...</span>
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
