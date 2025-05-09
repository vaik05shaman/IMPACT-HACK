import React from 'react'
import YouTube from 'react-youtube'

function ChapterContent({ chapter, content }) {
  return (
    <div className="p-4 sm:p-6 w-full">
      <h2 className="font-medium text-lg sm:text-2xl mb-2 sm:mb-4">{chapter?.["Chapter Name"] || 'Select a Chapter'}</h2>
      <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">{chapter?.About || 'No description available'}</p>
      <div className="w-full max-w-full mt-4 sm:mt-6">
        {content?.videoId && (
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md">
            <YouTube
              videoId={content.videoId}
              opts={{
                height: '100%',
                width: '100%',
                playerVars: {
                  autoplay: 0,
                },
              }}
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ChapterContent