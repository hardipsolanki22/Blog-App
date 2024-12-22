import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import postService from '../appWrite/config'
import PostCart from '../components/PostCart'

function AllPosts() {

    const [posts, setPosts] = useState([])
    const [loader, setLoader] = useState(true)

    console.log(`loaer: ${loader}`);
    

    useEffect(() => {
        postService.getPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        setLoader(false)
    }, [])

    return !loader ? (
        <div>
            <Container>
                { posts && posts.map((post) => ((
                        <div key={post.$id}>
                            <PostCart {...post} />
                        </div>
                    )))}
            </Container>

        </div>
    ) : (<>
    <h1 className='text-black font-semibold'>Loader...</h1>
    </>)
}

export default AllPosts
