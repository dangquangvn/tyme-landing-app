import React, { useEffect, useState } from 'react'
import NftItemDetail from './NFTItemDetail'
import { LIST_NFTS_URL } from '../configs/nft.endpoint'
import qs from 'query-string'
import { createUrlSearchParams } from '../utils/createUrlSearchParams'
import useQuery from '../hooks/useQuery'
import { NFTItemResponse } from '../types/nft.type'

interface NftItem {
  id: string
  name: string
  price: string
  imageUrl: string
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic'
  creator: string
}

interface NftListProps {
  items: NftItem[]
}

const characterImages = [
  '/src/assets/characters/assasin.png',
  '/src/assets/characters/basketball-girl.png',
  '/src/assets/characters/mafia.png',
  '/src/assets/characters/neon.png',
  '/src/assets/characters/the-dj.png'
]

const mapImageIdToUrl = (imageId: number): string => {
  // Use imageId to deterministically select an image
  const index = imageId % characterImages.length
  return characterImages[index]
}

const NftList: React.FC<NftListProps> = () => {
  const [items, setItems] = useState<NftItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const defaultUrl = createUrlSearchParams({ _page: 1, _limit: 10 })

  const query = useQuery()
  console.log('🚀TCL: - query:', query)

  useEffect(() => {
    fetch(defaultUrl)
      .then((response) => response.json())
      .then((data) => {
        const itemsWithImages = data.map((item: NFTItemResponse) => ({
          ...item,
          imageUrl: mapImageIdToUrl(item.imageId)
        }))
        setItems(itemsWithImages)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching NFT products:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className='text-white text-center py-10'>Loading NFTs...</div>
  }
  return (
    <div className='p-6 bg-gray-900 min-h-screen'>
      <div className='flex space-x-2 mb-6'>
        <button className='px-4 py-2 bg-gray-700 text-white rounded'>All</button>
        <button className='px-4 py-2 bg-gray-700 text-white rounded'>Legendary</button>
        <button className='px-4 py-2 bg-gray-700 text-white rounded'>Mythic</button>
        <button className='px-4 py-2 bg-gray-700 text-white rounded'>Epic</button>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {items.map((item) => {
          console.log('🚀TCL: - item:', item)
          return <NftItemDetail {...item} />
        })}
      </div>
    </div>
  )
}

export default NftList
