import React from 'react'

function ChapterListCard({ chapter, index }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 p-2 sm:p-3">
      <div className="flex items-center">
        <h2 className="rounded-full bg-primary p-1 w-6 h-6 sm:w-8 sm:h-8 text-center text-white text-xs sm:text-sm">
          {index + 1}
        </h2>
      </div>
      <div className="col-span-1 sm:col-span-4">
        <h2 className="font-medium text-xs sm:text-sm">{chapter["Chapter Name"]}</h2>
        <h2 className="text-xs sm:text-sm text-gray-600">{chapter?.Duration}</h2>
      </div>
    </div>
  )
}

export default ChapterListCard