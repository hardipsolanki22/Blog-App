import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import postService from '../appWrite/config'
import PostCart from '../components/PostCart'

function AllPosts() {

    const [posts, setPosts] = useState([])

    console.log(`posts: ${posts}`);
    

    useEffect(() => {
        postService.getPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })

    }, [])

    return (
        <div>
            <Container>
                { posts && posts.map((post) => ((
                        <div key={post.$id}>
                            <PostCart {...post} />
                        </div>
                    )))}
            </Container>

        </div>
    )
}

export default AllPosts
