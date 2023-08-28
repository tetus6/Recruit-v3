import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Navbar from "~/components/Navbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <section>
        <div className="h-16"></div>
      </section>
      <section className="bg-gray-900">
        <Component {...pageProps} />
      </section>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
