"use client";
import { Badge, Stack, Text, keyframes } from "@chakra-ui/react";
import useSWR from "swr";
import moment from "moment";

const pulse = keyframes({
  from: { transform: "translateX(100%)" },
  to: { transform: "translateX(-100%)" },
});

export default function Top5Text() {
  const { data: top5 } = useSWR("/search-histories/top5");

  return (
    <Stack direction="row" width="90%" overflow="hidden">
      <Text fontWeight="bold" fontSize="sm" zIndex={2}>
        Top 5 searched transactions
      </Text>
      <Stack m="auto" direction="row" alignItems="center" overflow="hidden">
        <Stack
          width="500px"
          direction="row"
          animation={`${pulse} 10s infinite linear`}
          overflow="hidden"
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
                  <Text fontWeight="bold">
                    {moment.localeData().ordinal(key)}.
                  </Text>
                  <Text fontWeight="bold">{data.hash}</Text>

                  <Badge ml="1" colorScheme="green">
                    {data.searches} occurrences
                  </Badge>
                </Text>
              );
            }
          )}
        </Stack>
      </Stack>
      <Text fontWeight="bold" fontSize="sm" zIndex={2}>
        Top 5 searched addresses
      </Text>
      <Stack m="auto" direction="row" alignItems="center" overflow="hidden">
        <Stack
          width="500px"
          direction="row"
          animation={`${pulse} 10s infinite linear`}
          overflow="hidden"
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
                  <Text fontWeight="bold">
                    {moment.localeData().ordinal(key)}.
                  </Text>
                  <Text fontWeight="bold">{data.hash}</Text>

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
