import Layout from "@/components/Layout";
import "@/styles/globals.css";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <HydrationBoundary state={pageProps.dehydratedState}>
        <SessionProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
