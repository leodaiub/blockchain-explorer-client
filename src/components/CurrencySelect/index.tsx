"use client";
import { useStore } from "@/store";
import { Select } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { shallow } from "zustand/shallow";

export default function CurrencySelect() {
  const [currency, updateCurrency] = useStore(
    (state) => [state.currency, state.updateCurrency],
    shallow
  );

  const handleChangeCurrency = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    updateCurrency(value as any);
  };

  return (
    <Select value={currency} onChange={handleChangeCurrency}>
      <option value="EUR">EUR</option>
      <option value="USD">USD</option>
      <option value="BTC">BTC</option>
    </Select>
  );
}
