import React, { useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import Select from '../Select'
import postService from '../../appWrite/config'
import { useNavigate } from 'react-router-dom'
import { addPost } from '../../featured/post/postSlice'
import { useSelector } from 'react-redux'

function PostForm({ post }) {

    const userData = useSelector(state => state.auth.status)
    const navigate = useNavigate()
    const [values, setValues] = useState({})
    const [error, setEror] = useState("")
    const [loader, setLoader] = useState(false)

    const handleChange = (e) => {
        const { name, value, files } = e.target

        if (name === "image") {
            setValues({
                ...values,
                [name]: files[0]
            })
        } else {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
        }
    }

    const postHandler = async (e) => {
        e.preventDefault()
        if (post) {
            try {
                setLoader(true)
                const data = {
                    title: post.title,
                    description: post.description,
                    status: post.status,
                    featuredimage: post.featuredimage
                }
                const file = values.image ? await postService.uploadFile(values.image) : null
                if (file) {
                    await postService.deleteFile(post.featuredimage)
                }
                const post = await postService.updatePost(post.$id, {
                    ...data,
                    featuredimage: file ? file.$id : post.$id
                }
                )
                if (post) {
                    navigate(`/posts/${post.$id}`)
                }
                setLoader(false)
            } catch (error) {
                setEror(error)
            }

        } else {
            try {
                setLoader(true)
                const fileUpload = values.featuredimage && await postService.uploadFile(values.featuredimage)
                const data = {
                    title: values.title,
                    description: values.description,
                    status: values.status,
                    featuredimage: values.image
                }
                if (fileUpload) {
                   const post = await postService.addPost({
                        ...data,
                        featuredimage: fileUpload.$id ,
                        userId: userData.$id 
                    })

                    if (post) {
                        navigate(`posts/${post.$id}`)
                    }
                }
            } catch (error) {
                setEror(error)
            }

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
                {post &&
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
                    label="Status"
                />
                { <Button type='submit'>
                    {post ? "Update" : "Submit"}
                </Button>

                }
            </form>
        </div>
    )
}

export default PostForm
