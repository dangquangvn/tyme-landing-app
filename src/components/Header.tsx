import { useEffect, useRef, useState } from 'react'
import Banner from './Banner'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const bannerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!bannerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('🚀TCL: - entry.isIntersecting:', entry.isIntersecting)
        setIsScrolled(!entry.isIntersecting)
      },
      { root: null, threshold: 0.1 }
    )

    observer.observe(bannerRef.current)

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current)
      }
    }
  }, [])

  return (
    <>
      {/* <header
        className={`transition-all duration-300 ${
          isScrolled
            ? 'fixed top-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-md shadow-lg z-50'
            : 'relative bg-transparent'
        } p-4 border-b border-purple-500 flex justify-between items-center px-8`}
      > */}
      <header
        className={`fixed top-0 transition-all duration-300 ${
          isScrolled ? 'bg-black bg-opacity-80 backdrop-blur-md shadow-lg z-50' : 'bg-transparent'
        } p-4 border-b border-purple-500 flex justify-between items-center px-8`}
      >
        <nav className='flex space-x-6 text-white uppercase text-sm font-semibold'>
          <a href='#' className='hover:text-purple-400'>
            Home
          </a>
          <a href='#' className='hover:text-purple-400'>
            About Us
          </a>
          <a href='#' className='hover:text-purple-400'>
            Our Teams
          </a>
          <a href='#' className='text-purple-400 border-b-2 border-purple-400'>
            Marketplace
          </a>
          <a href='#' className='hover:text-purple-400'>
            Roadmap
          </a>
          <a href='#' className='hover:text-purple-400'>
            Whitepaper
          </a>
        </nav>
        <div className='flex items-center space-x-4'>
          <button className='bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm'>
            Connect Wallet
          </button>
          <div className='text-white flex items-center space-x-1 cursor-pointer'>
            <span className='icon-[ic--baseline-language] text-2xl' />
            <span className='icon-[mdi--chevron-down] text-2xl' />
          </div>
        </div>
      </header>
      {/* <div ref={bannerRef} className='h-48' /> Placeholder for banner tracking */}
      <Banner ref={bannerRef} />
    </>
  )
}

export default Header
