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
import { useSession } from "next-auth/react";
import { Icons } from "./icons";
import { handleLocaleChange } from "@/lib/utils";
import { Languages } from "lucide-react";
import router from "next/router";

type Props = {
  // ...
} & React.ComponentProps<typeof DropdownMenuTrigger>;

export function UserNav({ className, ...props }: Props) {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className} {...props}>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={session?.user?.image ?? undefined} />
            <AvatarFallback>
              <Skeleton className="group-hover:border" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user?.name ?? "_NAME_NOT_FOUND_"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email ?? "_EMAIL_NOT_FOUND_"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
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
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>{" "}
        <DropdownMenuSeparator />
        <AlertDialogTrigger asChild>
          <DropdownMenuItem className="text-destructive hover:bg-destructive">
            <Icons.logOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </AlertDialogTrigger>{" "}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
