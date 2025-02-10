import { NFTCategory, NFTTheme, NFTTier } from '../configs/nft.enum'

export type NFTParams = {
  _page?: number
  _limit?: number
  _pricegte?: number
  _pricelte?: number
  _sort?: string
  _order?: string
  _title_like?: string
}

export type IAuthor = {
  firstName: string
  lastName: string
  email: string
  gender: string
  avatar: string
  onlineStatus: string
}

export type NFTItemResponse = {
  id: number
  title: string
  category: NFTCategory
  price: number
  isFavorite: boolean
  createdAt: number
  theme: NFTTheme
  tier: NFTTier
  imageId: number // 1 -> 20 (integer)
  author: IAuthor
}

export type NFTItem = NFTItemResponse & {
  imageUrl: string
}
