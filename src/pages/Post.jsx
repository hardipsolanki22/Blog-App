import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import postService from '../appWrite/config'
import { useSelector } from 'react-redux'
import Container from '../components/container/Container'
import Button from '../components/Button'

function Post() {

    const userData = useSelector(state => state.auth.status)
    const isAuth = post && userData ? post.userId === userData.$id : false

    console.log(`isAuth: ${isAuth}`);



   const { slug } = useParams()
   const [post, setPost] = useState({})
   const navigate = useNavigate()

   useEffect(() => {
    if (slug) {
      postService.getPost(slug)
        .then((post) => {
          if (post) setPost(post)
          else navigate("/")
        })
    } else {
      navigate("/")
    }
  }, [slug])

    const deleteHandler = async () => {
      const deletePost = await postService.deletePost(post.$id)
      if (deletePost) {
       const deleteFile = await postService.deleteFile(post.$id)
        if (deleteFile) {
         navigate("/")
       }
     }
   }

  return (
    <div>
      <Container>
        <div>
          <div>
            <img
              src={post.featerdImage} 
              alt={post.title}
            />
          </div>
          <div>
            <p>{post.title}</p>
            <p>{post.descrition}</p>
          </div>
          {isAuth &&
            <div>
              <div>
                <Link to={`edit-posts/${post.$id}`}>
                  <Button>
                    Edit
                  </Button>
                </Link>
                <Button onClick={deleteHandler}>
                  Delete
                </Button>
              </div>
            </div>

          }
        </div>
      </Container>
    </div>
  )
}

export default Post
