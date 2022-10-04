import React, { useContext } from 'react'
import { SavedPostsContext } from '../../context/SavedPostsContext'
import HomePost from '../Home/HomePost'

const ReadingList = () => {
  const { savedPosts } = useContext(SavedPostsContext)

  return (
    <div className="posts container !max-w-[900px] sm:p-1">
      <h2 className="my-5 text-center">المحفوظات للقراءه </h2>
      <HomePost readingListSavedPosts={savedPosts} />
    </div>
  )
}

export default ReadingList
