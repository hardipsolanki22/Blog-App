import React from 'react'
import Container from '../components/container/Container'
import PostForm from '../components/PostForm/PostForm'

function AddPost() {
  return (
    <div className='w-full min-h-screen flex justify-center items-center '>
      <Container>
        <PostForm/>
      </Container>
    </div>
  )
}

export default AddPost
