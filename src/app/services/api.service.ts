import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url ="https://server-cookpedia.onrender.com"

  constructor(private http:HttpClient) { }

  getAllRecipesAPI(){
    return this.http.get(`${this.server_url}/all-recipes`)
  }
  // add-testimony
  saveTestimonyAPI(reqBody:any){
    return this.http.post(`${this.server_url}/add-testimony`,reqBody)
  }

  // register
  registerAPI(reqBody:any){
    return this.http.post(`${this.server_url}/register`,reqBody)
  }

  // login
 loginAPI(reqBody:any){
    return this.http.post(`${this.server_url}/login`,reqBody)
  }

  // appendToken in Header
  appendToken(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  // recipe/:id/view
  viewRecipeAPI(id:string){
    return this.http.get(`${this.server_url}/recipe/${id}/view`,this.appendToken())
  }
 
  // related-recipes?cuisine=Italian
  getRelatedRecipeAPI(cuisine:string){
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`,this.appendToken())
  }

  // recipes/67357df094f77adcf2d7060a/download
  downloadRecipeAPI(id:string,recipeDetails:any){
    return this.http.post(`${this.server_url}/recipes/${id}/download`,recipeDetails,this.appendToken())
  }

  // recipe/save
  saveRecipeAPI(recipeDetails:any){
    return this.http.post(`${this.server_url}/recipe/save`,recipeDetails,this.appendToken())
  }

  // all-saved-recipes
  getSavedRecipeAPI(){
    return this.http.get(`${this.server_url}/all-saved-recipes`,this.appendToken())
  }

  // remove-saved-recipe
  deleteSavedRecipeAPI(id:any){
    return this.http.delete(`${this.server_url}/saved-recipe/${id}/remove`,this.appendToken())
  }

  // get all users
  getAllUsersAPI(){
    return this.http.get(`${this.server_url}/all-users`,this.appendToken())
  }

  // get all downloads
  getAllDownloadsAPI(){
    return this.http.get(`${this.server_url}/all-downloads`,this.appendToken())
  }

   // get all downloads
   getAllTestimonyAPI(){
    return this.http.get(`${this.server_url}/all-testimony`)
  }

  // get all downloads
  updateTestimonyStatusAPI(id:string,status:string){
    return this.http.get(`${this.server_url}/testimony/${id}?status=${status}`,this.appendToken())
  }

  // add recipe
  addRecipeAPI(recipeDetails:any){
    return this.http.post(`${this.server_url}/add-recipe`,recipeDetails,this.appendToken())
  }

  // remove-recipe
  removeRecipeAPI(id:string){
    return this.http.delete(`${this.server_url}/recipe/${id}/remove`,this.appendToken())
  }

  // edit-recipe
  UpdateRecipeAPI(id:string,recipeDetails:any){
    return this.http.put(`${this.server_url}/recipe/${id}/edit`,recipeDetails,this.appendToken())
  }

  // user/edit
  UpdateUserAPI(userdetails:any){
    return this.http.put(`${this.server_url}/user/edit`,userdetails,this.appendToken())
  }

}
 