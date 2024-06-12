import { useQuery } from '@tanstack/react-query'
import keys from '../constants/keys'
import Api from '../Api'

export interface GetPricesResult {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: null | number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: Roi | null;
  last_updated: string;
}

interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

export default function useGetPrices() {

  return useQuery<GetPricesResult[], Error>({
    queryKey: [keys.PRICE],
    refetchInterval: 1000 * 60,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    queryFn: async () => {

      const data = await Api.get('price/')

      return data.data
    }
  })
}

