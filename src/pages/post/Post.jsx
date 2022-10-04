import React, {
  useEffect,
  //  useState
} from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import slug from 'remark-slug'
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js'
import remarkToc from 'remark-toc'
import axios from 'axios'
import { FiEdit } from 'react-icons/fi'
import Cookies from 'js-cookie'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
const Post = () => {
  // const [liked, setLiked] = useState([])
  const navigate = useNavigate()
  const { id } = useParams()
  const { state } = useLocation()
  const [post, setPost] = React.useState({})
  useEffect(() => {
    hljs.safeMode()
    hljs.highlightAll()
    const getPost = async () => {
      const response = await axios.get(`http://localhost/api/v1/feed/${state.slug}-${id}`)
      setPost(response.data)
      console.log(response.data)
    }
    getPost()
  }, [])
  const date = new Date(post.published_at).toLocaleDateString('en-US')

  return (
    <div className="container sm:!p-3 flex gap-5 mb-4 ">
      <div className="flex  gap-7 text-lg mt-20 flex-col md:py-1 md:flex-row md:justify-around md:bg-white md:w-full md:left-0 md:fixed md:bottom-0">
        <button
          id="reaction-butt-like"
          aria-label="Like"
          aria-pressed="false"
          className="crayons-reaction crayons-reaction--like crayons-tooltip__activator relative activated"
          title="like this post"
          data-category="like"
        >
          <span className="crayons-reaction__icon crayons-reaction__icon--inactive">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              className="crayons-icon"
            >
              <path d="M21.179 12.794l.013.014L12 22l-9.192-9.192.013-.014A6.5 6.5 0 0112 3.64a6.5 6.5 0 019.179 9.154zM4.575 5.383a4.5 4.5 0 000 6.364L12 19.172l7.425-7.425a4.5 4.5 0 10-6.364-6.364L8.818 9.626 7.404 8.21l3.162-3.162a4.5 4.5 0 00-5.99.334l-.001.001z"></path>
            </svg>
          </span>
          <span className="crayons-reaction__icon crayons-reaction__icon--active">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              className="crayons-icon"
            >
              <path d="M2.821 12.794a6.5 6.5 0 017.413-10.24h-.002L5.99 6.798l1.414 1.414 4.242-4.242a6.5 6.5 0 019.193 9.192L12 22l-9.192-9.192.013-.014z"></path>
            </svg>
          </span>
          <span className="crayons-reaction__count" id="reaction-number-like">
            48
          </span>
        </button>
        <button
          id="reaction-butt-comment"
          aria-label="Jump to Comments"
          aria-pressed="false"
          className="crayons-reaction crayons-reaction--comment crayons-tooltip__activator relative"
          data-category="comment"
          title="jump to comments"
        >
          <span className="crayons-reaction__icon crayons-reaction__icon--inactive">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              className="crayons-icon"
            >
              <path d="M10 3h4a8 8 0 010 16v3.5c-5-2-12-5-12-11.5a8 8 0 018-8zm2 14h2a6 6 0 000-12h-4a6 6 0 00-6 6c0 3.61 2.462 5.966 8 8.48V17z"></path>
            </svg>
          </span>
          <span className="crayons-reaction__count" id="reaction-number-comment">
            13
          </span>
        </button>
        <button
          id="reaction-butt-readinglist"
          aria-label="Add to reading list"
          aria-pressed="false"
          className="crayons-reaction crayons-reaction--readinglist crayons-tooltip__activator relative activated"
          data-category="readinglist"
          title="save this post"
        >
          <span className="crayons-reaction__icon crayons-reaction__icon--inactive">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              className="crayons-icon"
            >
              <path d="M5 2h14a1 1 0 011 1v19.143a.5.5 0 01-.766.424L12 18.03l-7.234 4.536A.5.5 0 014 22.143V3a1 1 0 011-1zm13 2H6v15.432l6-3.761 6 3.761V4z"></path>
            </svg>
          </span>
          <span className="crayons-reaction__icon crayons-reaction__icon--active">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              className="crayons-icon"
            >
              <path d="M5 2h14a1 1 0 011 1v19.143a.5.5 0 01-.766.424L12 18.03l-7.234 4.536A.5.5 0 014 22.143V3a1 1 0 011-1z"></path>
            </svg>
          </span>
          <span className="crayons-reaction__count" id="reaction-number-readinglist">
            12
          </span>
        </button>
      </div>
      <div className="bg-white max-w-[850px] w-full mt-11 rounded-lg pb-6 relative">
        <img
          src={post.img ? post.img : null}
          className={` ${post.img ? 'h-[500px]' : 'h-0'} w-full  mb-5 object-cover rounded-t-lg`}
        />
        <div className="px-4">
          <h1>{post.title}</h1>
          <p className="m-0 text-slate-500 mt-2 mb-4">{date}</p>
          <ReactMarkdown remarkPlugins={[remarkToc, slug]} retypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
          {JSON.parse(Cookies.get('user_data'))?.id === post?.user_id ? (
            <div>
              <button
                onClick={() => {
                  navigate(`/edit-${post.pk}`, {
                    state: { slug: state.slug, title: post.title, content: post.content },
                  })
                }}
              >
                <FiEdit className="bg-blue-600  text-white text-[50px] p-2 rounded-xl fixed bottom-4 right-16 m-0" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Post

// const
