"use client";
import { Container, useToast } from "@chakra-ui/react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { delay, fromEvent, throttleTime } from "rxjs";
import { io } from "socket.io-client";
import SearchInput from "../components/SearchInput";
import useSWR from "swr";
import { Address, Message, Transaction } from "../types";
import TransactionCard from "../components/Transaction";
import AddressCard from "../components/Address";

export default function Page() {
  const toast = useToast();
  const socket = io("http://localhost:3000/");
  const [hash, setHash] = useState<string>("");
  const [hashType, setHashType] = useState<
    "addresses" | "transactions" | undefined
  >();
  const { data: result, mutate } = useSWR<Address | Transaction>(
    hash && hashType ? `/${hashType}/${hash}` : null
  );

  useEffect(() => {
    socket.emit(
      "message",
      JSON.stringify({
        op: "unconfirmed_sub",
      })
    );

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

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setHash(value);
      setHashType(value.length > 34 ? "transactions" : "addresses");
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
      <SearchInput
        onChange={handleSearch}
        clearValue={clearSearchInput}
      ></SearchInput>

      {result && hashType === "transactions" && (
        <TransactionCard transaction={result as Transaction} />
      )}
      {result && hashType === "addresses" && (
        <AddressCard address={result as Address} />
      )}
    </Container>
  );
}
