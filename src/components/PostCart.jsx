import React, { useEffect, useState } from 'react'
import appWriteService from '../appWrite/config'
import { Link } from 'react-router-dom'

export default function PostCart({ $id, title, featuredimage,content}) {

    return (
        <Link to={`/posts/${$id}`}>
            <div>
                <div>
                    <img src={appWriteService.getFilePreview(featuredimage)} alt={title} />
                </div>
                <div>
                    <p>{title}</p>
                    <p>{content}</p>
                </div>

            </div>

        </Link>
    )
}
