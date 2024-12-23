import React, { useEffect, useState } from 'react'
import appWriteService from '../appWrite/config'
import { Link } from 'react-router-dom'

export default function PostCart({ $id, title, featuredimage,content}) {

    return (
        <Link to={`/posts/${$id}`}>
            <div className='bg-white text-black font-semibold
            rounded-md shadow-md flex flex-col justify-center p-4'>
                <div className='w-auto m-4'>
                    <img src={appWriteService.getFilePreview(featuredimage)} alt={title} />
                </div>
                <div className='gap-4'>
                    <p>{title}</p>
                    <p>{content}</p>
                </div>

            </div>

        </Link>
    )
}
