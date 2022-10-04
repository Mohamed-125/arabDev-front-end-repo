import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavigationBar from './components/navbar/Navbar.jsx'
import React, { useState } from 'react'

import Register from './pages/register/Register'
import Login from './pages/login/Login.jsx'
import CreatePost from './pages/create-post/CreatePost'
import Home from './pages/Home/Home.jsx'
import Profile from './pages/Profile/Profile'
import Post from './pages/post/Post'
import ReadingList from './pages/reading-list/ReadingList'
import SearchPage from './pages/search-page/SearchPage'

function App() {
  const [searchedPosts, setSearchedPosts] = useState([])
  const [isRendered, setIsRendered] = useState(false)
  return (
    <Router>
      <NavigationBar setSearchedPosts={setSearchedPosts} searchedPosts={searchedPosts} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} replace />
        <Route path="/login" element={<Login />} replace />
        <Route path="/new" element={<CreatePost isRendered={isRendered} setIsRendered={setIsRendered} />} />
        <Route
          path="/edit-:id"
          element={
            <CreatePost link="http://localhost/api/v1/feed/" isRendered={isRendered} setIsRendered={setIsRendered} />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/reading-list" element={<ReadingList />} />
        <Route
          path="/q/:query"
          element={<SearchPage setSearchedPosts={setSearchedPosts} searchedPosts={searchedPosts} />}
        />
      </Routes>
    </Router>
  )
}

export default App
