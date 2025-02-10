import React from 'react'
import './style.css'

const Tag = () => {
  return (
    <>
      <div className='tag-parent'>
        NEW
        <div className='tag-inner'>
          <span className='icon-[mdi--checkbox-blank-circle] absolute top-[10%] left-[50%]'>
            <div className='arc'></div>
          </span>
        </div>
      </div>
      <div className='relative'>
        {/* <div className='icon-[mdi--tag] size-60 rotate-120'></div> */}
        <div className='icon-[mdi--tag] text-[200px] bg-gradient-to-r from-pink-500 to-purple-500 text-transparent rotate-120'></div>
        <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'>
          cuoc song ma
        </span>
      </div>
    </>
  )
}

export default Tag
