import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@/utils/api";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "@/styles/globals.css";
import { Inter as InterFont } from "next/font/google";
import { cn } from "@/lib/utils";
import AppLayout from "@/components/layout";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";

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
      <Head>
        <link rel="icon" href="/cc-kfupm-logo.ico" />
      </Head>
      <main
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          interFont.variable,
        )}
      >
        <style jsx global>{`
          html {
            font-family: ${interFont.style.fontFamily};
          }
        `}</style>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ThemeProvider>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(appWithTranslation(MyApp));
