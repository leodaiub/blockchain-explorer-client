"use client";
import { Address } from "@/types";
import { useConvertToBTC } from "@/utilities";
import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react";

export default function AddressCard({ address }: { address: Address }) {
  const { convertFromBTC } = useConvertToBTC();
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
