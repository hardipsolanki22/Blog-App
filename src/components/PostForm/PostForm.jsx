import React, { useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import Select from '../Select'
import postService from '../../appWrite/config'
import { useNavigate } from 'react-router-dom'
import { addPost } from '../../featured/post/postSlice'

function PostForm({ post }) {
    const navigate = useNavigate()
    const [values, setValues] = useState({})
    const [error, setEror] = useState("")
    const [loader, setLoader] = useState(false)

    const handleChange = (e) => {
        const {name, value , files} = e.target
        
        if (name === "image") {
            setValues({
                ...values,
                [name]: files[0]
            })
        } else {
            setValues({
                [e.target.name]: e.target.value
            })
        }
     }

    const postHandler = async(e) => {
        e.preventDefault()
        if (post) {
            
            
        } else {
            
        }

    }



    return (
        <div>
            <h2>Post</h2>
            <form onSubmit={postHandler}>
                <Input
                    type="text"
                    placeholder="Enter Title"
                    name="title"
                    label="Title: "
                    value={post ? post.title : ''}
                    onChange={(e) => handleChange(e)}
                />
                <Input
                    type="text"
                    placeholder="Enter Description"
                    name="description"
                    label="Descripiton: "
                    value={post ? post.title : ''}
                    onChange={(e) => handleChange(e)}
                />
                { post && 
                    <img 
                    src={postService.getFilePreview(post.featuredimage)}
                    alt={postService.getFilePreview(post.title)}
                    />
                }
                 <Input
                    type="file"
                    name="image"
                    label="FeaturedImage: "
                    accept="image/png, image.gpeg image/jpg image/gif"
                    onChange={(e) => handleChange(e)}
                />
                <Select
                options={["active", "inactive"]}
                />
                {!loader ? (
                    <Button>
                        Submit
                    </Button>
                ) : <> <h2>Loading</h2> </>}
            </form>
        </div>
    )
}

export default PostForm
