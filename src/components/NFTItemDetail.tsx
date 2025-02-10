import React from 'react'

interface NftItemDetailProps {
  id: string
  title: string
  price: string
  imageUrl: string
  category: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic'
  creator: string
}

const rarityColors: Record<string, string> = {
  Common: 'bg-green-500',
  Rare: 'bg-blue-500',
  Epic: 'bg-purple-500',
  Legendary: 'bg-yellow-500',
  Mythic: 'bg-red-500'
}

const generateGradient = (category: string): string => {
  const gradients: Record<string, string> = {
    Common: 'bg-gradient-to-r from-green-500 to-teal-500',
    Rare: 'bg-gradient-to-r from-sky-500 to-indigo-500',
    Epic: 'bg-gradient-to-r from-fuchsia-500 to-indigo-500',
    Legendary: 'bg-gradient-to-r from-orange-500 to-yellow-500',
    Mythic: 'bg-gradient-to-r from-red-500 to-pink-500'
  }
  return gradients[category] || 'bg-gray-800'
}

const NftItemDetail: React.FC<NftItemDetailProps> = ({ id, title, price, imageUrl, category, creator }) => {
  return (
    <div className='max-w-sm bg-gray-900 rounded-lg shadow-lg p-4 relative'>
      <span
        className={`absolute top-2 left-2 px-3 py-1 text-sm font-semibold text-white rounded ${rarityColors[category]}`}
      >
        {category}
      </span>
      <div className={`w-full h-48 rounded-lg ${generateGradient(category)} flex justify-center items-center`}>
        <img src={imageUrl} alt={title} className='h-full object-contain rounded-lg' />
      </div>
      <div className='mt-4 text-white'>
        <h3 className='text-lg font-semibold'>{title}</h3>
        <p className='text-gray-400'>By {creator}</p>
        <div className='mt-2 text-xl font-bold'>{price} ETH</div>
      </div>
      <button className='mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'>Buy Now</button>
    </div>
  )
}

export default NftItemDetail
