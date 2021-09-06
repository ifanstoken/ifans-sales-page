import { useCallback, useEffect, useState } from 'react';
import useIFans from './useIFans';
import { Currency } from 'blockchain/types/Currency';

const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const ifans = useIFans();

  const fetchCurrencies = useCallback(async () => {
    try {
      const _currencies = await ifans?.getCurrencies();
      setCurrencies(_currencies?_currencies:[]);
      console.log("Currencies: ", _currencies);
    } catch (e) {
      console.log("Currencies Fetching Error: ", e);
    }
  }, [ifans])

  useEffect(() => {
    fetchCurrencies();
    return () => {};
  }, [ifans, fetchCurrencies]);

  return { currencies, defaultCurrency: currencies?.length>0?currencies[0]:null };  
}

export default useCurrencies;
