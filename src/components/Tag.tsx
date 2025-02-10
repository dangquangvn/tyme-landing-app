import React from 'react'
import Tag2 from './Tag2'
import TagArcIcon from './TagArcIcon'

const Tag = () => {
  return (
    <div className='relative inline-block'>
      <Tag2 />
      <div className='drop-shadow-lg font-bold absolute top-[50%] left-[50%] text-9xl -translate-[50%] -skew-10'>
        NEW
      </div>
      <div className='absolute top-[17%] right-[-7%]'>
        <TagArcIcon />
      </div>
    </div>
  )
}

export default Tag
