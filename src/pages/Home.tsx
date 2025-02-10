import React from 'react'
import Header from '../components/Header'
import FilterSidebar from '../components/FilterSidebar'
import NftList from '../components/NFTList'
import Footer from '../components/Footer'

const nftData = [
  {
    id: '1',
    name: 'The DJ',
    price: '2.75',
    // imageUrl: 'https://example.com/nft1.png',
    imageUrl: '/src/assets/avatar-img.png',
    rarity: 'Epic',
    creator: '@Chozai_Ghozalu'
  },
  {
    id: '2',
    name: 'Assassin',
    price: '2.75',
    // imageUrl: 'https://example.com/nft2.png',
    imageUrl: '/src/assets/avatar-img.png',
    rarity: 'Common',
    creator: '@Chozai_Ghozalu'
  },
  {
    id: '3',
    name: 'Neon Guy',
    price: '2.75',
    imageUrl: '/src/assets/avatar-img.png',
    // imageUrl: 'https://example.com/nft3.png',
    rarity: 'Rare',
    creator: '@Chozai_Ghozalu'
  },
  {
    id: '3',
    name: 'Neon Guy',
    price: '2.75',
    imageUrl: '/src/assets/avatar-img.png',
    // imageUrl: 'https://example.com/nft3.png',
    rarity: 'Legendary',
    creator: '@Chozai_Ghozalu'
  },
  {
    id: '4',
    name: 'Basketball Girl',
    price: '2.75',
    imageUrl: '/src/assets/avatar-img.png',
    // imageUrl: 'https://example.com/nft4.png',
    rarity: 'Mythic',
    creator: '@Chozai_Ghozalu'
  }
]

const Home = () => {
  return (
    <div className='bg-black text-white min-w-screen'>
      <Header />
      {/* <Banner /> */}
      <div className='flex px-8 py-4'>
        <FilterSidebar />
        {/* <NFTGrid /> */}
        {/* <ProductGrid /> */}
        <NftList items={nftData} />
      </div>
      <Footer />
    </div>
  )
}

export default Home
