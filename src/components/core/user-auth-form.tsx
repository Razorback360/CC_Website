import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMicrosoftLoading, setIsMicrosoftLoading] = useState<boolean>(false);

  const router = useRouter();

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={async () => {
          setIsMicrosoftLoading(true);
          // TODO - implement microsoft auth
          await signIn("azure-ad");
        }}
        disabled={isLoading || isMicrosoftLoading}
      >
        {isMicrosoftLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.microsoft className="mr-2 h-4 w-4" />
        )}{" "}
        Microsoft
      </button>
    </div>
  );
}
