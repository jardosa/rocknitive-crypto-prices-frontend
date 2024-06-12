import { useQuery } from '@tanstack/react-query'
import keys from '../constants/keys'
import Api from '../Api'
import { isNil } from 'lodash';


type GetPriceResult = {
  latest: number;
  average: number;
  history: (number | string)[][];
  count: number;
}

export default function useGetPrice(id: string, minutes?: number) {

  return useQuery<GetPriceResult, Error>({
    queryKey: [keys.PRICE, id, minutes],
    refetchInterval: 1000 * 60,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    queryFn: async () => {

      const data = await Api.get(`price/${id}`, {
        params: {
          ...!isNil(minutes) && { minutes }
        },
      })

      return data.data
    },
    enabled: !!id
  })
}