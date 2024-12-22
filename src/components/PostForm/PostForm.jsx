import React, { useState, useEffect } from 'react'
import Input from '../Input'
import Button from '../Button'
import Select from '../Select'
import postService from '../../appWrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {

    const userData = useSelector(state => state.auth.userData)
    const navigate = useNavigate()
    const [error, setEror] = useState("")
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        status: "active",
        featuredimage: null,
        userId: userData ? userData.$id : ""
    })


    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title || "",
                slug: post.slug || "",
                content: post.content || "",
                status: post.status || "active",
                featuredimage: post.featuredimage || null,
                userId: userData ? userData.$id : ""
            })
        }
    }, [post, userData])

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            const file = files[0];
            setFormData((prevValues) => ({
                ...prevValues,
                [name]: file
            }));
        } else {
            setFormData((prevValues) => ({
                ...prevValues,
                [name]: value
            }));
        }
        if (name === 'title') {
            setFormData((prevValues) => ({
                ...prevValues,
                slug: value
                    .toLocaleLowerCase()
                    .replace(/\s+/g, "-")
            }));
        }
    };

    const postHandler = async (e) => {
        setEror("")
        e.preventDefault()
        if (post) {
            try {
                const data = {
                    title: formData.title,
                    slug: formData.slug,
                    content: formData.content,
                    status: formData.status,
                    featuredimage: formData.featuredimage
                }
                const file = formData.featuredimage.type !== "string." ? await postService.uploadFile(formData.featuredimage) : null
                if (file) {
                    await postService.deleteFile(post.featuredimage)
                }
                const editedPost = await postService.updatePost(post.$id, {
                    ...data,
                    featuredimage: file ? file.$id : post.featuredimage
                }
                )
                if (editedPost) {
                    navigate(`/posts/${editedPost.slug}`)
                }
            } catch (error) {
                setEror(error.message)
            }

        } else {
            try {
                const data = {
                    title: formData.title,
                    slug: formData.slug,
                    content: formData.content,
                    status: formData.status,
                    featuredimage: formData.featuredimage
                }

                const fileUpload = formData.featuredimage && await postService.uploadFile(formData.featuredimage)
                if (fileUpload) {
                    const post = await postService.createPost({
                        ...data,
                        featuredimage: fileUpload.$id,
                        userId: userData.$id
                    })
                    console.log(`fileUpload: ${fileUpload}`);
                    if (post) {
                        navigate("/")
                    }
                }
            } catch (error) {
                setEror(error.message)
            }
        }
    }

    return (
        <div className='w-full bg-gray-600 text-black'>
            <div>
                <h2>PostForm</h2>
                {error && <p className='text-red-600'>{error}</p>}
            </div>
            <form onSubmit={postHandler} method='post'>
                <Input
                    type="text"
                    placeholder="Enter Title"
                    name="title"
                    label="Title: "
                    value={formData.title}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="slug"
                    name="slug"
                    label="Slug: "
                    value={formData.slug}
                    readOnly={true}
                />
                <Input
                    type="text"
                    placeholder="Enter Description"
                    name="content"
                    label="Content: "
                    value={formData.content}
                    onChange={handleChange}
                />
                {post && post.featuredimage ? (<div>
                    <img
                        src={postService.getFilePreview(post.featuredimage)}
                        alt={"Feartured"}
                    />
                </div>) : null
                }
                <Input
                    type="file"
                    name="featuredimage"
                    label="FeaturedImage: "
                    accept="image/png, image.gpeg image/jpg image/gif"
                    onChange={handleChange}
                />
                <Select
                    opations={["active", "inactive"]}
                    label="Status: "
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                />
                <Button type='submit' onClick={postHandler}>
                    {post ? "Update" : "Submit"}
                </Button>
            </form>
        </div>
    )
}

export default PostForm

