import React, { useEffect, useRef } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
const WritePost = ({ markdown, title, content, setMarkdown, postTitle, setPostTitle, setPostTags, postTags }) => {
  useEffect(() => {
    tagsInputRef.current.value = null
  }, [postTags])

  const tagsInputRef = useRef()

  const deleteTagHandler = e => {
    setPostTags(pre => pre.filter(tag => parseInt(tag.id) !== parseInt(e.target.parentNode.id)))
  }

  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="file_input">
        اختر صوره المنشور
      </label>
      <input
        className="block w-full text-sm   rounded-lg border border-gray-300 cursor-pointer text-white focus:outline-none bg-gray-700 p-1 "
        id="file_input"
        type="file"
        onChange={e => {
          // setPostImg(URL.createObjectURL(e.target.files[0]))
        }}
      />
      <input
        onChange={e => {
          setPostTitle(e.target.value)
        }}
        placeholder="اكتب عنوان المنشور"
        required /* eslint-disable */
        defaultValue={title ? title : postTitle}
        className="w-full p-2 border-2 rounded-md mt-6 border-gray-400"
      />
      <div className="border-2 flex gap-3 mt-7  rounded-md py-2 px-2 flex-wrap border-black ">
        {postTags.map(postTag => {
          return (
            <div className="bg-gray-300 items-center flex gap-2 rounded-lg px-2 py-1 " key={postTag.id} id={postTag.id}>
              {postTag.title}
              <AiFillCloseCircle className="text-lg cursor-pointer" onClick={deleteTagHandler} />
            </div>
          )
        })}
        <input
          ref={tagsInputRef}
          onKeyDown={e => {
            if (e.keyCode === 13 && postTags.length === 10) {
              alert('10 تقنيات فقط')
              return
            }
            if (e.keyCode === 13 && e.target.value.trim()) {
              if (postTags.some(tag => tag.title === e.target.value)) {
                return
              }
              setPostTags(pre => [
                ...pre,
                {
                  id: Math.random() * 1000000,
                  title: e.target.value.trim(),
                },
              ])
            }
          }}
          defaultValue={postTags}
          placeholder="اكتب هنا تقنيات"
          className="w-[200px] p-2 tags-input  "
        />
      </div>

      <textarea
        /* eslint-disable */
        defaultValue={content ? content : markdown}
        className="h-[500px] w-full mt-10 rounded-lg border-[1.5px] border-gray-300 shadow-md px-4 py-7 text-[20px]"
        onChange={e => {
          setMarkdown(e.target.value.replace('#', '##').replace('<', ' &lt;h1&gt;').replace('>', '&lt;/h1&gt;'))
        }}
      ></textarea>
    </>
  )
}

export default WritePost
