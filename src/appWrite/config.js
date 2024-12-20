import conf from "../envImport/conf";
import { Client, Account, ID, Databases, Storage, Query } from 'appwrite'

export class Service {
    client = new Client
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    
    async createPost({title , slug , content , featuredimage , status , userId}) {
        try {
            return await this.databases.createDocument(
                conf.appWriteDataBaseId ,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log('Appwrite service :: createPost :: error' , error);
            
        }
    }

    async updatePost(slug ,{ title , content , featuredimage , status }) {
        try {
           return await this.databases.updateDocument(
            conf.appWriteDataBaseId,
            conf.appWriteCollectionId,
            slug,
            {
                title,
                content,
                featuredimage,
                status
            }
           )
        } catch (error) {
            console.log('Appwrite service :: updatePost :: error' , error);

        }
    }

    async deletePost(slug) {
        try {
             await this.databases.deleteDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log('Appwrite service :: deletePost :: error' , error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                slug
            )
        } catch (error) {
            console.log('Appwrite service :: getPost :: error' , error);

        }
    }

    async getPosts(queries = [Query.equal("status" , "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                queries,
                
            )
            return null
        } catch (error) {
            console.log('Appwrite service :: getAllPost :: error' , error);
            return false
        }
    }


    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Appwrite service :: uploadFile :: error' , error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log('Appwrite service :: deleteFile :: error' , error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )
    }
}

const service = new Service()

export default service

