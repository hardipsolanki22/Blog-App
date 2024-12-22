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

  console.log(`isAuth: ${isAuth}`);
  console.log(`Post: ${JSON.stringify(post)}`);

  useEffect(() => {
    if (slug) {
      postService.getPost(slug)
        .then((post) => {
          if (post) setPost(post)
          else navigate("/")
        })
      setLoader(false)
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
  <Container>
    <div>
      <div>
        <img
          src={post.featuredimage && postService.getFilePreview(post?.featuredimage)}
          alt={post.title}
        />
      </div>
      <div>
        <p>{post.title}</p>
        <p>{post.content}</p>
      </div>
      {isAuth &&
        <div>
          <div>
            <Link to={`/edit-posts/${post.$id}`}>
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
</div>) : (<>
  <h1>Loding...</h1>
</>)
}

export default Post
