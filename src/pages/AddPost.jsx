import React from 'react'
import Container from '../components/container/Container'
import PostForm from '../components/PostForm/PostForm'

function AddPost() {
  return (
    <div className='w-full bg-slate-800 text-black'>
      <Container>
        <PostForm/>
      </Container>
    </div>
  )
}

export default AddPost
