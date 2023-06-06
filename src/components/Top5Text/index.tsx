"use client";
import { Badge, Stack, Text, keyframes } from "@chakra-ui/react";
import useSWR from "swr";
import moment from "moment";

const pulse = keyframes({
  from: { transform: "translateX(5%)" },
  to: { transform: "translateX(-100%)" },
});

export default function Top5Text() {
  const { data: top5 } = useSWR("/search-histories/top5");

  return (
    <Stack
      direction="row"
      width="80%"
      alignItems={"center"}
      overflow="hidden"
      mx={2}
    >
      <Text fontWeight="bold" fontSize="xs">
        Top 5 searched transactions
      </Text>
      <Stack
        m="auto"
        direction="row"
        alignItems="center"
        overflow="hidden"
        maxW={400}
      >
        <Stack
          width="20000px"
          direction="row"
          animation={`${pulse} 50s infinite linear`}
        >
          {top5?.transactions?.map(
            (
              data: {
                searches: number;
                hash: string;
              },
              k: number
            ) => {
              const key = k + 1;

              return (
                <Text
                  key={k}
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                >
                  <Text as="span" fontWeight="bold" pr={2}>
                    {moment.localeData().ordinal(key)}.
                  </Text>
                  <Text as="span" fontWeight="bold">
                    {data.hash}
                  </Text>

                  <Badge ml="1" colorScheme="green">
                    {data.searches} occurrences
                  </Badge>
                </Text>
              );
            }
          )}
        </Stack>
      </Stack>
      <Text fontWeight="bold" fontSize="xs" zIndex={2}>
        Top 5 searched addresses
      </Text>
      <Stack
        m="auto"
        direction="row"
        alignItems="center"
        overflow="hidden"
        maxW={400}
      >
        <Stack
          width="20000px"
          direction="row"
          animation={`${pulse} 40s infinite linear`}
        >
          {top5?.addresses?.map(
            (
              data: {
                searches: number;
                hash: string;
              },
              k: number
            ) => {
              const key = k + 1;

              return (
                <Text
                  key={k}
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                >
                  <Text as="span" fontWeight="bold" pr={2}>
                    {moment.localeData().ordinal(key)}.
                  </Text>
                  <Text as="span" fontWeight="bold">
                    {data.hash}
                  </Text>

                  <Badge ml="1" colorScheme="green">
                    {data.searches} occurrences
                  </Badge>
                </Text>
              );
            }
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
