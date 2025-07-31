import conf from "../conf/conf";

import {Client,Account,ID} from "appwrite"

export class AuthService{
    client=new Client()
    account;
    
    constructor(){
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectID);
        this.account=new Account(this.client);
    }
    async createAccount({email,password,name}){
        try {
           const userAccount= await this.account.create(ID.unique(),email,password,name)
           if(userAccount){
            //return userAccount
            //this will return the useraccount but we want to if account is created then 
            //we will make him login 
            return this.login({email,password})

           }else{
            return userAccount
           }
    

            
        } catch (error) {
            throw  error
            
        }
    }
    async login({email,password}){

        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) { 
          
            throw error
        }
    }

    
    async getCurrentUser(){
        try {
            return await this.account.get()
            
        } catch (error) {
            throw error;
            
        }


    }
    async logOut(){
        try {
            await this.account.deleteSessions()
            
        } catch (error) {
            console.log('appwrite : logout',error)
            
        }
    }

}

//Instead of exporting Authservice we gonna import authservie because after this we dont have to create a new object

const authservice=new AuthService();
export default authservice









// This is not a good way this will make app complitem 

// import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');                 // Your project ID

// const account = new Account(client);

// const user = await account.create(
//     ID.unique(), 
//     'email@example.com', 
//     'password'
// );
