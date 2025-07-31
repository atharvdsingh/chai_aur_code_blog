import conf from "../conf/conf";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectID);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  
  async createPost({ title, slug, content, featuredIMG, status, userId }) {
    try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionID,
                slug,
                {title,content,featuredIMG,status,userId}
            )

    } catch (error) {
      throw error;
    }
  }
  async updataPost(slug,{title,content,featuredIMG,status}){
    try {
        return await this.databases.updateDocument(
            conf.appWriteDatabaseID,
            conf.appWriteCollectionID,
            slug,
            {title,content,featuredIMG,status,userId}
        )
        
    } catch (error) {
        throw error
        
    }
  }
  async deletePost(slug){
    try {
         await this.databases.deleteDocument(
            conf.appWriteDatabaseID,
            conf.appWriteCollectionID,
            slug
        )
        return true
        
    } catch (error) {
        console.log('appwrite service :: deletePost',error)
        return false
    }
  }
  async getPost(slug){
try {
    return await this.databases.getDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        slug
    )
    
} catch (error) {
    console.log("appwrite service :: getpost",error)
    return false
}
  }
  async getPosts(queries=[Query.equal('status','active')]){
    try {
        return await this.databases.listDocuments(
            conf.appWriteDatabaseID,
            conf.queries,


        )
        
    } catch (error) {
        console.log('appwrite servie :: getposts',error)
        return false
        
    }
  }

  async uploadFile(file){
    try {
        return await this.bucket.uploadFile(
            conf.appWriteBucketID,
            ID.unique(),
            file 
        )
        
    } catch (error) {
     console.log('appwrite servie :: file') 
     return false  
    }
  }
  async deleteFile(fileID){
    try {
        await this.bucket.uploadFile(
            conf.appWriteBucketID,
            fileID
        
        )
        return true
        
    } catch (error) {
        console.log(error)
    }
  }
  getFilePreview(fileID){
    return this.bucket.getFilePreview(
        conf.appWriteBucketID,
        fileID
    )
  }

}

const service = new Service();
export default service;
