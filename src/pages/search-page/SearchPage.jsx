import React, { useContext, useEffect } from 'react'
import HomePosts from '../Home/HomePost'
import { useParams } from 'react-router-dom'
import { PostsContext } from '../../context/PostsContext'
const SearchPage = ({ setSearchedPosts, searchedPosts }) => {
  const { posts } = useContext(PostsContext)
  const { query } = useParams()

  useEffect(() => {
    setSearchedPosts(
      posts.filter(post =>
        post.title.toLowerCase().trim().replace(' ', '').includes(query.toLowerCase().trim().replace(' ', ''))
      )
    )
  }, [posts])

  return <HomePosts searchedPosts={searchedPosts} />
}

export default SearchPage
