"use client";
import { Address } from "@/app/types";
import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react";

export default function AddressCard({ address }: { address: Address }) {
  return (
    <Card>
      <CardHeader>{address.address}</CardHeader>
      <CardBody>
        <Text>Total transactions: {address.n_tx}</Text>
        <Text>Total amount spent: {address.total_sent}</Text>
        <Text>Total amount received: {address.total_received}</Text>
        <Text>Total amount unreceived: {address.n_unredeemed}</Text>
        <Text>Current balance: {address.final_balance}</Text>
      </CardBody>
    </Card>
  );
}
