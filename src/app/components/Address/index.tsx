"use client";
import { useStore } from "@/app/store";
import { Address } from "@/app/types";
import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import useSWR from "swr";

export default function AddressCard({ address }: { address: Address }) {
  const [currency] = useStore((state) => [state.currency]);
  const { data: tickers } = useSWR("exchange");

  const convertFromBTC = useCallback(
    (amountInBTC: number) => {
      return `${(amountInBTC / (tickers?.[currency]?.last || 1)).toLocaleString(
        undefined,
        { style: "currency", currency }
      )}`;
    },
    [currency, tickers]
  );

  return (
    <Card>
      <CardHeader>{address.address}</CardHeader>
      <CardBody>
        <Text>Total transactions: {address.n_tx}</Text>
        <Text>Total amount spent: {convertFromBTC(address.total_sent)}</Text>
        <Text>
          Total amount received: {convertFromBTC(address.total_received)}
        </Text>
        <Text>
          Total amount unreceived: {convertFromBTC(address.n_unredeemed)}
        </Text>
        <Text>Current balance: {convertFromBTC(address.final_balance)} </Text>
      </CardBody>
    </Card>
  );
}
