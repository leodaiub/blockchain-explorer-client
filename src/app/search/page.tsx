"use client";
import { Button, Container, Stack, useToast } from "@chakra-ui/react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { delay, fromEvent, throttleTime } from "rxjs";
import SearchInput from "../components/SearchInput";
import useSWR from "swr";
import { Address, Message, Transaction } from "../types";
import TransactionCard from "../components/Transaction";
import AddressCard from "../components/Address";
import { socket } from "../services";

export default function Page() {
  const toast = useToast();
  const [hash, setHash] = useState<string>("");
  const [hashType, setHashType] = useState<
    "addresses" | "transactions" | undefined
  >();
  const { data: result, mutate } = useSWR<Address | Transaction>(
    hash && hashType ? `/${hashType}/${hash}` : null
  );

  useEffect(() => {
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subscribe = useCallback(() => {
    socket.emit(
      "message",
      JSON.stringify({
        op: "addr_sub",
        addr: hash,
      })
    );

    toast({
      description: "Subscribe to hash: " + hash,
      status: "info",
      duration: 2000,
      isClosable: true,
    });

    fromEvent(socket, "message")
      .pipe(delay(1000), throttleTime(1000))
      .subscribe((payload: string) => {
        const info: Message = JSON.parse(payload);
        info &&
          toast({
            description: info.x.out[0].value,
            status: "info",
            duration: 2000,
            isClosable: true,
          });
      });
  }, [hash, toast]);

  const handleSearch = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setHash(value);
      setHashType(value.length > 40 ? "transactions" : "addresses");
      mutate();
    },
    [mutate]
  );

  const clearSearchInput = useCallback(() => {
    setHash("");
    setHashType(undefined);
    mutate();
  }, [mutate]);

  return (
    <Container mb="4">
      <Stack justifyContent={"center"}>
        <SearchInput
          onChange={handleSearch}
          clearValue={clearSearchInput}
        ></SearchInput>

        {result && hashType === "transactions" && (
          <TransactionCard transaction={result as Transaction} />
        )}
        {result && hashType === "addresses" && (
          <>
            <AddressCard address={result as Address} />
            <Button margin={"auto"} onClick={subscribe}>
              Subscrive to updates
            </Button>
          </>
        )}
      </Stack>
    </Container>
  );
}
