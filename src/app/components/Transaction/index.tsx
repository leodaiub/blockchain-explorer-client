"use client";
import { Transaction } from "@/app/types";
import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react";
import moment from "moment";

export default function TransactionCard({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <Card>
      <CardHeader>{transaction.hash}</CardHeader>
      <CardBody>
        <Text>
          Time: {moment(transaction.time).format("DD/MM/YYYY  hh:mm")}
        </Text>
        <Text>Status: {transaction.lock_time}</Text>
        <Text>Size: {transaction.size}</Text>
        <Text>Confirmations: {transaction.relayed_by}</Text>
        <Text>Total input value: {transaction.inputs[0].prev_out.value}</Text>
        <Text>Total output value: {transaction.out[0].value}</Text>
        <Text>Total fees paid: {transaction.fee}</Text>
      </CardBody>
    </Card>
  );
}
