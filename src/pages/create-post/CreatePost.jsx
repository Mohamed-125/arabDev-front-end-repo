import { Container } from 'react-bootstrap'
import React, { useEffect, useState, useContext } from 'react'
import PreviewPost from './PreviewPost.jsx'
import WritePost from './WritePost.jsx'
import CreateButton from 'components/buttons/CreateButton'
import { IsLoggedInContext } from '../../context/IsLoggedInContext'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import { PostsContext } from '../../context/PostsContext'
const CreatePost = ({ isRendered, setIsRendered, link }) => {
  const [isWriting, setIsWriting] = useState(true)
  const [postTitle, setPostTitle] = useState('')
  const [postTags, setPostTags] = useState([])
  const [markdown, setMarkdown] = useState('')

  const { isLoggedIn } = useContext(IsLoggedInContext)
  const { setPosts } = useContext(PostsContext)
  const { state } = useLocation()
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (isRendered) {
      if (!isLoggedIn) {
        navigate('/login')
      }
    } else {
      setIsRendered(true)
    }
  })

  useEffect(() => {
    if (
      localStorage.getItem('markdown') &&
      localStorage.getItem('postTitle') &&
      JSON.parse(localStorage.getItem('postTags'))
    ) {
      setMarkdown(localStorage.getItem('markdown'))
      setPostTitle(localStorage.getItem('postTitle'))
      setPostTags(JSON.parse(localStorage.getItem('postTags')))
    }
  }, [])

  useEffect(() => {
    if (isRendered) {
      localStorage.setItem('markdown', markdown)
      localStorage.setItem('postTitle', postTitle)
    } else {
      setIsRendered(true)
    }
  }, [markdown, postTitle, postTags])

  const publishNewPost = async () => {
    try {
      const response = await axios.put(
        link ? link + state.slug + '-' + id : 'http://localhost/api/v1/feed/',
        {
          title: postTitle,
          content: markdown,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
          },
        }
      )
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
      console.log(response)
      navigate(-1)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container className="bg-white mt-7 py-7  rounded-lg">
      <div className="flex justify-between">
        <h2 className="sm:hidden">كتابه منشور جديد</h2>
        <div className="sm:justify-center sm:w-full gap-3 flex">
          <button
            onClick={() => {
              setIsWriting(true)
            }}
            className="!text-primary-color bg-slate-300 px-5 py-1 rounded-lg"
          >
            كتابه
          </button>
          <button
            onClick={() => {
              setIsWriting(false)
            }}
            className="!text-primary-color bg-slate-300 px-5 py-1 rounded-lg"
          >
            معاينه
          </button>
        </div>
      </div>

      {isWriting ? (
        <WritePost
          setMarkdown={setMarkdown}
          setPostTitle={setPostTitle}
          postTags={postTags}
          postTitle={postTitle}
          setPostTags={setPostTags}
          markdown={markdown}
          title={state?.title}
          content={state?.content}
        />
      ) : (
        <PreviewPost markdown={markdown} />
      )}
      <div className="flex gap-7 justify-end">
        <CreateButton text="حفظ" />
        <CreateButton text="الغاء" className=" border-[#EA0000] text-[#EA0000] hover:bg-[#EA0000] hover:text-white" />
        <CreateButton text="نشر" onClick={publishNewPost} />
      </div>
    </Container>
  )
}

export default CreatePost
