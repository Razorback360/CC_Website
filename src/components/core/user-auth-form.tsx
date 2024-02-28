import { signIn } from "next-auth/react";
import { useState } from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isMicrosoftLoading, setIsMicrosoftLoading] = useState<boolean>(false);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Continue with <b>KFUPM Authentication</b>
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        className="bg-green-500 text-primary-foreground font-semibold"
        onClick={async () => {
          setIsMicrosoftLoading(true);
          await signIn("azure-ad");
        }}
        icon={Icons.microsoft}
        isLoading={isMicrosoftLoading}
      >
        KFUPM Authentication
      </Button>
    </div>
  );
}
