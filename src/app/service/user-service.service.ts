import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpService : HttpService) { }

  postRest(body : any)
  {
   return  this.httpService.encodedPostForm('user/reset-password',body)
  }

  addNote(body : any){
    return this.httpService.encodedPostForm('notes/addNotes',body);
  }
  
  searchUserList(body: any){
    return this.httpService.postJSON('user/searchUserList',body);
  }
  service(){
    return this.httpService.getJSON('user/service');
  }
}
