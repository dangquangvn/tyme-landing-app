const NFTGrid = () => {
  const nftData = [
    { id: 1, name: 'Cyber DJ', price: '1.2 ETH', image: '/images/nft1.png', bgColor: 'bg-purple-500' },
    { id: 2, name: 'Neon Dancer', price: '0.9 ETH', image: '/images/nft2.png', bgColor: 'bg-blue-500' },
    { id: 3, name: 'Tech Ninja', price: '1.5 ETH', image: '/images/nft3.png', bgColor: 'bg-green-500' }
  ]

  return (
    <div className='w-3/4 p-4 grid grid-cols-3 gap-4 h-[1500px]'>
      {nftData.map((nft) => (
        <div key={nft.id} className={`p-4 rounded-lg shadow-lg ${nft.bgColor}`}>
          <img src={nft.image} alt={nft.name} className='w-full h-40 object-cover rounded-lg' />
          <h3 className='text-lg font-semibold mt-2'>{nft.name}</h3>
          <p className='text-sm'>{nft.price}</p>
        </div>
      ))}
    </div>
  )
}

export default NFTGrid
