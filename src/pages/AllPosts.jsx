import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import postService from '../appWrite/config'
import PostCart from '../components/PostCart'

function AllPosts() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        postService.getPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts)
                }
            })

    }, [])

    return (
        <div>
            <Container>
                {posts?.map((post) => {
                    return (
                        <div key={post.$id}>
                            <PostCart post={post} />
                        </div>
                    )
                })}
            </Container>

        </div>
    )
}

export default AllPosts
