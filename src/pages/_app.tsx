import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@/utils/api";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "@/styles/globals.css";
import { Inter as InterFont } from "next/font/google";
import { cn } from "@/lib/utils";

export const interFont = InterFont({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          interFont.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
