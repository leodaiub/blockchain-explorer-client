"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { SWRConfig } from "swr";
import { axiosInstance, fetcher } from "@/app/services";
import { useSession } from "next-auth/react";

export function Providers({ children }: any) {
  const { data: session }: any = useSession();
  axiosInstance.defaults.headers["Authorization"] =
    "Bearer " + session?.accessToken;
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <CacheProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </SWRConfig>
  );
}
