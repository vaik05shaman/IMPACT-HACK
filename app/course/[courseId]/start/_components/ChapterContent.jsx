
import React from 'react'
import  YouTube  from 'react-youtube'


function ChapterContent({chapter,content}) {
   
  return (
    <div className='p-5'>
      <h2 className='font-medium text-2xl'>{chapter?.["Chapter Name"]}</h2>
      <p className=' '>{chapter?.About}</p>
      

  <div className='flex justify-center mt-10'>

  {  <YouTube
        videoId={content?.videoId}
        opts={{
          height: '390',
          width: '640',
          playerVars: {
            autoplay: 0,
          },
        }}/>}
    </div>

    <div>
       
        </div>

    </div>
  )
}


export default ChapterContent
