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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchInterval: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  const router = useRouter();

  useEffect(() => {
    const page = router.asPath;
    const [navigation] = performance.getEntriesByType(
      "navigation",
    ) as PerformanceNavigationTiming[];
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.requestStart;
      const serverProcessingTime =
        navigation.responseStart - navigation.requestStart;

      console.log("Time to First Byte (TTFB):", ttfb, "ms");
      console.log("Server Processing Time:", serverProcessingTime, "ms");
    }
    const handleRouteChangeStart = (page: string) => {
      console.time(`${page}Page Transition Time`);
    };

    const handleRouteChangeComplete = (page: string) => {
      console.timeEnd(`${page}Page Transition Time`);
    };

    router.events.on("routeChangeStart", () => handleRouteChangeStart(page));
    router.events.on("routeChangeComplete", () =>
      handleRouteChangeComplete(page),
    );

    // 클린업 함수
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

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
