import React, { useContext, useEffect } from 'react'
import { SavedPostsContext } from '../../context/SavedPostsContext'
import { PostsContext } from '../../context/PostsContext'
import { useNavigate } from 'react-router-dom'
import Loader from 'components/loader/Loader.jsx'
function HomePost({ readingListSavedPosts, searchedPosts }) {
  const { savedPosts, setSavedPosts } = useContext(SavedPostsContext)
  const navigate = useNavigate()
  const { posts } = useContext(PostsContext)
  const [homePosts, setHomePosts] = React.useState([])

  useEffect(() => {
    if (readingListSavedPosts) {
      if (readingListSavedPosts.length > 0) {
        setHomePosts(readingListSavedPosts)
      } else {
        setHomePosts('لا توجد اي محفوظات')
      }
    } else if (searchedPosts) {
      if (searchedPosts.length > 0) {
        setHomePosts(searchedPosts)
      } else {
        setHomePosts('لم نتمكن من ايجاد شئ ')
      }
    } else {
      setHomePosts(posts)
    }
  }, [readingListSavedPosts, searchedPosts, posts])

  return (
    <div className="pt-2">
      {/* Iterate over imported array in postData */}
      <div className="posts">
        {/* Display each data in array in a card */}
        {/* Each card must have a 'key' attribute */}

        {Array.isArray(homePosts) ? (
          homePosts.length > 0 ? (
            homePosts.map(post => {
              const date = new Date(post.published_at).toLocaleDateString('en-US')
              return (
                <div
                  className=" break-words mb-7 relative cursor-pointer rounded-lg shadow-sm !px-7   py-7 bg-white  "
                  key={post.pk}
                  id={post.pk}
                >
                  <div
                    onClick={() => {
                      navigate(`/post/${post.pk}`, { state: { slug: post.slug } })
                    }}
                    className={`absolute bg-center rounded-t-[10px] mb-12 top-0 left-0 bg-cover w-full h-[200px]`}
                    style={{ backgroundImage: `url(${post?.img})` }}
                  ></div>
                  <div className={post.img ? `mt-[200px]` : null}>
                    <h3
                      className="text-3xl md:text-2xl mt-2 font-bold"
                      onClick={() => {
                        navigate(`/post/${post.pk}`, { state: { slug: post.slug } })
                      }}
                    >
                      {post.title}
                    </h3>
                    <div
                      onClick={() => {
                        navigate(`/post/${post.pk}`, { state: { slug: post.slug } })
                      }}
                      className=" mb-2 mt-0 flex flex-col items-start gap-0"
                    >
                      <p className="m-0">{post.author}</p> <p className="m-0 text-slate-500">{date}</p>
                    </div>

                    <p
                      className="md:hidden"
                      onClick={() => {
                        navigate(`/post/${post.pk}`, { state: { slug: post.slug } })
                      }}
                    >
                      {post?.content?.slice(0, 150) + ' ...'}
                    </p>
                    <div className="flex justify-center md:justify-start gap-2 flex-wrap">
                      {post?.tags?.map((tag, index) => {
                        return (
                          <a key={index} href="#" className="">
                            {tag}
                          </a>
                        )
                      })}
                    </div>
                    <div className="d-flex flex-wrap gap-4 mt-3 items-center justify-between">
                      <div className="d-flex gap-4">
                        <div className="d-flex sm:flex-wrap gap-3">
                          <p className="flex gap-1 mb-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              role="img"
                              aria-labelledby="app2pesflcmmotzd9mvcfcf0bujrwtxs"
                              className="crayons-icon"
                            >
                              <title id="app2pesflcmmotzd9mvcfcf0bujrwtxs">Reactions</title>
                              <path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path>
                            </svg>
                            {post.reacts}
                            <span> reactions</span>
                          </p>

                          <p className="flex gap-1  mb-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              role="img"
                              aria-labelledby="ami8uwsz0gc2a40w558dr4mzn2q2iatc"
                              className="crayons-icon"
                            >
                              <title id="ami8uwsz0gc2a40w558dr4mzn2q2iatc">Comments</title>
                              <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
                            </svg>
                            {post.comments}
                            <span>commnets</span>
                          </p>
                        </div>
                      </div>
                      <button
                        className="flex z-50"
                        type="button"
                        aria-label="Save to reading list"
                        title="Save to reading list"
                      >
                        {Array.isArray(savedPosts) && savedPosts.find(savedPost => savedPost.pk === post.pk) ? (
                          <span className="bm-success ">
                            <svg
                              onClick={() => {
                                console.log(savedPosts.filter(savedPost => savedPost.pk !== post.pk))
                                setSavedPosts(pre => pre.filter(savedPost => savedPost.pk !== post.pk))
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              aria-hidden="true"
                            >
                              <path d="M6.75 4.5h10.5a.75.75 0 01.75.75v14.357a.375.375 0 01-.575.318L12 16.523l-5.426 3.401A.375.375 0 016 19.607V5.25a.75.75 0 01.75-.75z"></path>
                            </svg>
                          </span>
                        ) : (
                          <span className="bm-initial   ">
                            <svg
                              onClick={() => {
                                console.log(post.pk)
                                setSavedPosts(pre => [...pre, post])
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              aria-hidden="true"
                            >
                              <path d="M6.75 4.5h10.5a.75.75 0 01.75.75v14.357a.375.375 0 01-.575.318L12 16.523l-5.426 3.401A.375.375 0 016 19.607V5.25a.75.75 0 01.75-.75zM16.5 6h-9v11.574l4.5-2.82 4.5 2.82V6z"></path>
                            </svg>
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <Loader />
          )
        ) : (
          <p className=" text-center text-2xl text-slate-600"> {homePosts} </p>
        )}
      </div>
    </div>
  )
}
export default HomePost
