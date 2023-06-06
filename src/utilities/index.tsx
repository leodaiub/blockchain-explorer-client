import { useCallback } from "react";
import useSWR from "swr";
import { useStore } from "@/store";

export const useConvertToBTC = () => {
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

  return { convertFromBTC };
};
