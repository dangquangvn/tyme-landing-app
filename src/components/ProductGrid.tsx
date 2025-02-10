import React, { useState } from 'react'

type Product = {
  id: number
  name: string
  price: string
  imageUrl: string
  rarity: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'The DJ',
    price: '2.75 ETH',
    imageUrl: 'dj-image-url',
    rarity: 'Legendary'
  },
  {
    id: 2,
    name: 'Assassin',
    price: '2.25 ETH',
    imageUrl: 'assassin-image-url',
    rarity: 'Common'
  },
  {
    id: 3,
    name: 'Neon Guy',
    price: '2.75 ETH',
    imageUrl: 'neon-guy-image-url',
    rarity: 'Rare'
  }
  // Add more products as needed
]

const ProductGrid: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRarity, setSelectedRarity] = useState<string>('All')

  const filteredProducts = products.filter((product) => {
    return (
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '') &&
      (selectedRarity === 'All' || product.rarity === selectedRarity)
    )
  })

  return (
    <div className='bg-gradient-to-r from-indigo-500 to-purple-600 min-h-screen text-white p-8'>
      {/* Header Section */}
      <div className='flex justify-between items-center mb-8'>
        <div className='w-full max-w-xs'>
          <input
            type='text'
            placeholder='Quick search'
            className='w-full py-2 px-4 rounded-lg bg-black text-white placeholder-gray-400'
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className='ml-4 bg-pink-500 py-2 px-4 rounded-lg font-semibold'>Reset filter</button>
      </div>

      <div className='flex'>
        {/* Filter Sidebar */}
        <div className='w-1/4 p-4 bg-black bg-opacity-50 rounded-lg mr-4'>
          <h2 className='text-xl font-bold mb-4'>Filters</h2>
          <div className='mb-4'>
            <h3 className='font-semibold'>Rarity</h3>
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className='w-full py-2 px-4 rounded-lg bg-black text-white mt-2'
            >
              <option value='All'>All</option>
              <option value='Legendary'>Legendary</option>
              <option value='Rare'>Rare</option>
              <option value='Common'>Common</option>
              {/* Add more rarity options */}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {filteredProducts.map((product) => (
            <div key={product.id} className='bg-black p-4 rounded-lg'>
              <img src={product.imageUrl} alt={product.name} className='w-full h-64 object-cover rounded-md' />
              <h3 className='text-lg font-semibold mt-2'>{product.name}</h3>
              <p className='text-gray-400 text-sm'>{product.rarity}</p>
              <p className='text-white mt-2'>{product.price}</p>
              <button className='mt-2 text-pink-500 hover:text-pink-300'>❤️</button>
            </div>
          ))}
        </div>
      </div>

      {/* View More Button */}
      <div className='text-center mt-8'>
        <button className='bg-pink-500 py-2 px-4 rounded-lg font-semibold'>View More</button>
      </div>
    </div>
  )
}

export default ProductGrid
