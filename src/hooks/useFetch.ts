import useSWR from 'swr'
import { fetcher } from '@/services/fetcher'

export function useFetch(endpoint: string) {
  return useSWR(`/api/${endpoint}`, async function () {
    const response = await fetcher(endpoint)

    return response.json()
  })
}
