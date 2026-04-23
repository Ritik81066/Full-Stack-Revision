import config from "../config/config";


import { Client, Account, ID } from "appwrite";


export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
       this.account=new Account(this.client); 
    }

    async createAccount({email,password,name}){
        const user=await this.account.create({userId: ID.unique(), email, password, name});
        if(user){
            return this.login({email,password})
        }else{
            return user;
        }
    }


    async login({email,password}){
        return await this.account.createEmailSession(email,password);
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error);
            return null; // 👈 IMPORTANT
        }
    }


    async logout(){
        return await this.account.deleteSessions();
    }
}

const authService=new AuthService();

export default authService