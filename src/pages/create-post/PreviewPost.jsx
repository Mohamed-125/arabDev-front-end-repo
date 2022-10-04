import { Container } from 'react-bootstrap'
import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import slug from 'remark-slug'
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js'
import remarkToc from 'remark-toc'

const PreviewPost = ({ markdown }) => {
  useEffect(() => {
    hljs.safeMode()
    hljs.highlightAll()
  }, [])
  return (
    <Container>
      <div className="mt-10"></div>
      <img className="mb-7 w-full h-[300px] object-cover" />
      <ReactMarkdown remarkPlugins={[remarkToc, slug]} retypePlugins={[rehypeHighlight]}>
        {markdown}
      </ReactMarkdown>
    </Container>
  )
}

export default PreviewPost
