import { ChangeEventHandler, useEffect, useState } from 'react'
import PriceRangeSlider from './Inputs/PriceRangeSlider'
import useQuery from '../hooks/useQuery'
import { NFTParams } from '../types/nft.type'
import { NFTSort, NFTTheme, NFTTier } from '../configs/nft.enum'
import { useLocation, useNavigate } from 'react-router-dom'

type NFTFilterProps = {
  title: string
  priceRange: [number, number]
  tier: NFTTier
  theme: NFTTheme
  time: NFTSort
  priceSort: NFTSort
}

const defaultFilters: NFTFilterProps = {
  title: '',
  priceRange: [0.01, 200],
  tier: NFTTier.All,
  theme: NFTTheme.All,
  time: NFTSort.Desc,
  priceSort: NFTSort.Asc
}

const FilterSidebar = () => {
  const [price, setPrice] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState([0.01, 200])
  const [tier, setTier] = useState('All')
  const [theme, setTheme] = useState('Halloween')
  const [time, setTime] = useState('Latest')
  const [priceSort, setPriceSort] = useState('Low to high')

  const query = useQuery()
  const navigate = useNavigate()
  const location = useLocation()

  const [filters, setFilters] = useState<NFTFilterProps>(defaultFilters)

  console.log('🚀TCL: - filters:', filters)

  // const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newPriceRange = [...priceRange]
  //   newPriceRange[parseInt(e.target.name)] = parseFloat(e.target.value)
  //   setPriceRange(newPriceRange)
  // }

  // const handleRangeChange = ({ min, max }: { min: number; max: number }) => {
  //   console.log('🚀TCL: handleRangeChange -> min', min, max)
  // }

  // const handleReset = () => {
  //   setSearchQuery('')
  //   setPriceRange([0.01, 200])
  //   setTier('All')
  //   setTheme('Halloween')
  //   setTime('Latest')
  //   setPriceSort('Low to high')
  // }

  // const handleSearch = () => {
  //   // Add search logic here (e.g., filter the products)
  //   console.log('Search triggered with filters: ', {
  //     searchQuery,
  //     priceRange,
  //     tier,
  //     theme,
  //     time,
  //     priceSort
  //   })
  // }

  // Handles input changes dynamically
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    updateFilters({ [name]: value })
  }

  // Handles price range changes
  const handlePriceChange = (e) => {
    const index = parseInt(e.target.name)
    const newPriceRange = [...filters.priceRange]
    newPriceRange[index] = parseFloat(e.target.value)
    updateFilters({ priceRange: newPriceRange })
  }

  // Handles slider range change
  const handleRangeChange = ({ min, max }) => {
    updateFilters({ priceRange: [min, max] })
  }

  // Function to update URL when filters change
  const updateFilters = (newValues) => {
    console.log('🚀TCL: - newValues:', newValues)
    const updatedFilters = { ...filters, ...newValues }
    setFilters(updatedFilters)

    const params = new URLSearchParams()
    if (updatedFilters.searchQuery) params.set('search', updatedFilters.searchQuery)
    params.set('minPrice', updatedFilters.priceRange[0])
    params.set('maxPrice', updatedFilters.priceRange[1])
    if (updatedFilters.tier !== 'All') params.set('tier', updatedFilters.tier)
    if (updatedFilters.theme !== 'All') params.set('theme', updatedFilters.theme)

    if (updatedFilters.time !== 'Latest') {
      const timeMap = {
        Latest: 'desc',
        Oldest: 'asc'
      }
      params.set('time', timeMap[updatedFilters.time as keyof typeof timeMap] || 'desc')
    }

    if (updatedFilters.priceSort !== 'Low to high') {
      const sortMap = {
        'Low to high': 'asc',
        'High to low': 'desc'
      }
      params.set('sort', sortMap[updatedFilters.priceSort as keyof typeof sortMap] || 'asc')
    }

    navigate(`?${params.toString()}`, { replace: true })
  }

  // Reset Filters
  const handleReset = () => {
    navigate('/', { replace: true }) // Clear URL params
    setFilters(defaultFilters) // Reset to default state
  }

  // Search Trigger
  const handleSearch = () => {
    console.log('Search triggered with filters:', filters)
  }

  // Sync state with URL params on first render
  useEffect(() => {
    console.log('query: ', query)
    const { minPrice, maxPrice } = query
    const _filters = { ...query, priceRange: [parseFloat(minPrice as string), parseFloat(maxPrice as string)] }
    setFilters(_filters as NFTFilterProps)
  }, [location.search])

  return (
    <div className='bg-black bg-opacity-50 p-6 rounded-lg text-white max-w-xs'>
      {/* Search Bar */}
      <div className='mb-4'>
        <label htmlFor='search' className='block text-lg font-semibold'>
          Quick search
        </label>
        <input
          type='text'
          id='search'
          className='w-full py-2 px-4 mt-2 rounded-lg bg-black text-white placeholder-gray-400'
          placeholder='Search...'
          value={searchQuery}
          onChange={handleChange}
        />
      </div>

      {/* Price Range Slider */}
      <div className='mb-4'>
        <label className='block text-lg font-semibold'>Price</label>
        <div className='flex justify-between text-sm'>
          <span>0.01 ETH</span>
          <span>200 ETH</span>
        </div>
        <input
          type='range'
          min='0.01'
          max='200'
          step='0.01'
          value={filters.priceRange[0]}
          onChange={handlePriceChange}
          name='0'
          className='w-full mt-2'
        />
        <input
          type='range'
          min='0.01'
          max='200'
          step='0.01'
          value={filters.priceRange[1]}
          onChange={handlePriceChange}
          name='1'
          className='w-full mt-2'
        />
        <PriceRangeSlider min={200} max={1000} value={filters.priceRange} onChange={handleRangeChange} />
        <div className='flex justify-between text-sm'>
          <span>{priceRange[0]} ETH</span>
          <span>{priceRange[1]} ETH</span>
        </div>
      </div>

      {/* Dropdown Filters */}
      {[
        { label: 'Tier', name: 'tier', options: ['All', 'Legendary', 'Epic', 'Rare'] },
        { label: 'Theme', name: 'theme', options: ['All', 'Halloween', 'Space', 'Cyberpunk'] },
        { label: 'Time', name: 'time', options: ['Latest', 'Oldest'] },
        { label: 'Price Sort', name: 'priceSort', options: ['Low to high', 'High to low'] }
      ].map(({ label, name, options }) => (
        <div className='mb-4' key={name}>
          <label htmlFor={name} className='block text-lg font-semibold'>
            {label}
          </label>
          <select
            id={name}
            name={name}
            value={filters[name as keyof Omit<NFTFilterProps, 'priceRange' | 'title'>]}
            onChange={handleChange}
            className='w-full py-2 px-4 mt-2 rounded-lg bg-black text-white'
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
      {/* <div className='mb-4'>
        <label htmlFor='tier' className='block text-lg font-semibold'>
          Tier
        </label>
        <select
          id='tier'
          value={tier}
          onChange={handleChange}
          className='w-full py-2 px-4 mt-2 rounded-lg bg-black text-white'
        >
          <option value='All'>All</option>
          <option value='Legendary'>Legendary</option>
          <option value='Epic'>Epic</option>
          <option value='Rare'>Rare</option>
        </select>
      </div>

      <div className='mb-4'>
        <label htmlFor='theme' className='block text-lg font-semibold'>
          Theme
        </label>
        <select
          id='theme'
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className='w-full py-2 px-4 mt-2 rounded-lg bg-black text-white'
        >
          <option value='Halloween'>Halloween</option>
          <option value='Space'>Space</option>
          <option value='Cyberpunk'>Cyberpunk</option>
        </select>
      </div>

      <div className='mb-4'>
        <label htmlFor='time' className='block text-lg font-semibold'>
          Time
        </label>
        <select
          id='time'
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className='w-full py-2 px-4 mt-2 rounded-lg bg-black text-white'
        >
          <option value='Latest'>Latest</option>
          <option value='Oldest'>Oldest</option>
        </select>
      </div>

      <div className='mb-4'>
        <label htmlFor='priceSort' className='block text-lg font-semibold'>
          Price Sort
        </label>
        <select
          id='priceSort'
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
          className='w-full py-2 px-4 mt-2 rounded-lg bg-black text-white'
        >
          <option value='Low to high'>Low to high</option>
          <option value='High to low'>High to low</option>
        </select>
      </div> */}

      {/* Buttons */}
      <div className='flex justify-between items-center'>
        <button onClick={handleReset} className='text-yellow-500 hover:text-yellow-300 font-semibold'>
          Reset filter
        </button>
        <button onClick={handleSearch} className='bg-pink-500 text-white py-2 px-4 rounded-lg font-semibold'>
          Search
        </button>
      </div>
    </div>
  )
}

export default FilterSidebar
