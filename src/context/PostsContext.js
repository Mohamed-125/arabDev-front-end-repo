/* eslint-disable camelcase */
import React, { useState, createContext, useEffect } from 'react'
import axios from 'axios'
export const PostsContext = createContext()

const PostsContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get('http://localhost/api/v1/feed/')
        console.log(response.data)
        setPosts(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    getPosts()
  }, [])

  return <PostsContext.Provider value={{ posts, setPosts }}>{children}</PostsContext.Provider>
}
export default PostsContextProvider
