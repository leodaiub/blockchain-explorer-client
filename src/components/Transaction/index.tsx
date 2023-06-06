"use client";
import { Transaction } from "@/types";
import { useConvertToBTC } from "@/utilities";
import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react";
import moment from "moment";

export default function TransactionCard({
  transaction,
}: {
  transaction: Transaction;
}) {
  const { convertFromBTC } = useConvertToBTC();

  return (
    <Card>
      <CardHeader>{transaction.hash}</CardHeader>
      <CardBody>
        <Text>
          Time: {moment(transaction.time).format("DD/MM/YYYY  hh:mm")}
        </Text>
        <Text>Status: {transaction.lock_time}</Text>
        <Text>Size: {transaction.size} Bytes</Text>
        <Text>Confirmations: {transaction.relayed_by}</Text>
        <Text>
          Total input value:
          {convertFromBTC(
            transaction.inputs.reduce((acc, tx) => acc + tx.prev_out.value, 0)
          )}
        </Text>
        <Text>
          Total output value:{" "}
          {convertFromBTC(
            transaction.out.reduce((acc, tx) => acc + tx.value, 0)
          )}
        </Text>
        <Text>Total fees paid: {convertFromBTC(transaction.fee)}</Text>
      </CardBody>
    </Card>
  );
}
