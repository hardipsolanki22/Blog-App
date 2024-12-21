import conf from "../envImport/conf";
import {Client, Account, ID} from 'appwrite'

 class AuthService {
    client = new Client();
    account 

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {
        try {
           const userAccount = await this.account.create(ID.unique(), email, password, name)
                return userAccount
                // return this.login({email, password})
        } catch (error) {
            throw error;
            
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get()
            if (user) {
                return user;
            } else {
                return null
            }
        } catch (error) {
            throw error
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}


const authService = new AuthService();

export default authService;