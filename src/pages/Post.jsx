import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import postService from '../appWrite/config'

function Post() {

    const {slug} = useParams()
    const [post, setPost] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        postService.getPost()
    }, [slug])

  return (
    <div>
      
    </div>
  )
}

export default Post
