import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import postService from '../appWrite/config'
import { useSelector } from 'react-redux'
import Container from '../components/container/Container'
import Button from '../components/Button'

function Post() {
  const { slug } = useParams()
  const [post, setPost] = useState({})
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)


  const userData = useSelector(state => state.auth.userData)
  const isAuth = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      postService.getPost(slug)
        .then((post) => {
          if (post) setPost(post)
          else navigate("/")
        })
        .finally(() => setLoader(false))
    } else {
      navigate("/")
    }
  }, [slug])

  const deleteHandler = () => {
    postService.deletePost(post.$id)
      .then(() => {
        postService.deleteFile(post.$id)
          .then(() => {
            navigate("/")
          })
      })

  }


  return !loader ? (<div>
    <div className='flex justify-center items-center'>
      <Container>
        <div className='w-auto flex justify-center items-center my-1 mx-4 p-10 bg-white'>
          <img
            src={post.featuredimage && postService.getFilePreview(post?.featuredimage)}
            alt={post.title}
          />
        </div>
        <div className='w-auto h-full flex justify-center flex-col my-2 mx-4 bg-white
        p-4 text-black'>
          <div>
            <p className='my-3 font-semibold'>{post.title}</p>
            <p>{post.content}</p>
          </div>
          {isAuth &&
              <div className='flex justify-center items-center mt-6'>
                <Link to={`/edit-posts/${post.$id}`}>
                  <Button className='bg-gray-600 text-center mx-4 text-black'>
                    Edit
                  </Button>
                </Link>
                <Button onClick={deleteHandler} className='bg-gray-600  text-center'>
                  Delete
                </Button>
            </div>

          }
        </div>
      </Container>
    </div>
  </div>) : (<>
    <h1 className='text-black font-semibold m-4 text-center'>Loding...</h1>
  </>)
}

export default Post
