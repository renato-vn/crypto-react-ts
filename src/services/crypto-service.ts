import axios from "axios";
import {
  CryptoCurrenciesResponseSchema,
  CryptoPriceSchema,
} from "../schemas/crypto-schema";
import { Pair } from "../types";

export const getCryptos = async () => {
  const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`;
  const {
    data: { Data },
  } = await axios(url);
  const result = CryptoCurrenciesResponseSchema.safeParse(Data);
  if (result.success) {
    return result.data;
  }
};

export const fetchCurrentCryptoPrice = async (pair: Pair) => {
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.cryptoCurrency}&tsyms=${pair.currency}`;
  const {
    data: { DISPLAY },
  } = await axios(url);

  const result = CryptoPriceSchema.safeParse(
    DISPLAY[pair.cryptoCurrency][pair.currency]
  );

  if (result.success) {
    return result.data;
  }
};
