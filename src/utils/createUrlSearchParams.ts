import { LIST_NFTS_URL } from '../configs/nft.endpoint'
import { NFTParams } from '../types/nft.type'
import qs from 'query-string'

export const createUrlSearchParams = (params: NFTParams) => {
  return `${LIST_NFTS_URL}?${qs.stringify(params)}`
}
