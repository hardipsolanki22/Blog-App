import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Container from '../components/container/Container'
import PostForm from '../components/PostForm/PostForm'
import postService from '../appWrite/config'

function EditPost() {

    const {slug} = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState({})

    useEffect(() => {
        if (slug) {
            postService.getPost(slug)
            .then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

  return (post ? (
    <div className=' w-full flex justify-center items-center'>
        <Container>
        <PostForm post={post} />
        </Container>
    </div>
  ) : null )
}

export default EditPost
