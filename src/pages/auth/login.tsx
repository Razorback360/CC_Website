import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/core/user-auth-form";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";

function LoginPage() {
  const router = useRouter();
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Button
        onClick={() => router.back()}
        variant="outline"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Button>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto my-4 w-72" />
          <h1 className="text-3xl font-semibold tracking-tight">Welcome</h1>
          <p className="text-sm text-muted-foreground">
            Enter your username to sign in to your account
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/auth/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
