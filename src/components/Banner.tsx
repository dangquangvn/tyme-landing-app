import type { Ref } from 'react'
// import Tag from './TagDraft'
import Tag from './Tag'

type BannerProps = {
  ref: Ref<HTMLDivElement>
}

const Banner = ({ ref }: BannerProps) => (
  <div
    // className="bg-gradient-to-r from-purple-600 to-blue-500 p-8 text-center bg-[url('./assets/bg-banner.jpeg')] bg-center bg-cover"
    className='bg-gradient-to-r from-purple-600 to-blue-500 p-8 text-center bg-center bg-cover'
    ref={ref}
    style={{
      background: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(./src/assets/bg-banner.jpeg)'
    }}
  >
    <div className='content flex flex-row items-center justify-between'>
      <div className='text'>
        <div
          id='cta'
          className='relative inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 text-5xl font-bold rounded-lg shadow-lg flex items-center'
        >
          <Tag />
          <div className='absolute right-[-20px] top-[-10px] bg-pink-600 text-xs px-2 py-1 rounded shadow-md rotate-12'>
            SHOP NOW
          </div>
        </div>

        <h1 className='text-4xl font-bold'>ARRIVAL</h1>
      </div>
      <img src='/src/assets/avatar-img.png' alt='' />
    </div>
    {/* Character Cards Section */}
    <div className='mt-8 flex space-x-4 overflow-x-auto'>
      <div className='flex flex-col items-center'>
        <img src='assassin-image-url' alt='Assassin' className='w-32 h-32 object-cover rounded-lg' />
        <p className='mt-2'>ASSASSIN</p>
      </div>
      <div className='flex flex-col items-center'>
        <img src='neon-guy-image-url' alt='Neon Guy' className='w-32 h-32 object-cover rounded-lg' />
        <p className='mt-2'>NEON GUY</p>
      </div>
      <div className='flex flex-col items-center'>
        <img src='mafia-england-image-url' alt='Mafia England' className='w-32 h-32 object-cover rounded-lg' />
        <p className='mt-2'>MAFIA ENGLAND</p>
      </div>
      <div className='flex flex-col items-center'>
        <img src='basketball-girl-image-url' alt='Basketball Girl' className='w-32 h-32 object-cover rounded-lg' />
        <p className='mt-2'>BASKETBALL GIRL</p>
      </div>
      <div className='flex flex-col items-center'>
        <img src='dj-image-url' alt='The DJ' className='w-32 h-32 object-cover rounded-lg' />
        <p className='mt-2'>THE DJ</p>
      </div>
    </div>
    <p className='text-lg mt-2'>Discover the latest NFTs</p>
    anh em ta
  </div>
)

export default Banner
