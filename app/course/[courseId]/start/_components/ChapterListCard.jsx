import React from 'react'

function ChapterListCard({chapter,index}) {
  return (
    <div className='grid grid-cols-5 p-3 gap-2'>
        <div>
            <h2 className='rounded-full bg-primary p-1 w-8 h-8 text-center text-white'>
                {index+1}
            </h2>
        </div>
        <div className='col-span-4'>
           <h2 className='font-medium'>{chapter["Chapter Name"]}</h2> 
           <h2 className=''> {chapter?.Duration}</h2>
           </div>
      
    </div>
  )
}

export default ChapterListCard
