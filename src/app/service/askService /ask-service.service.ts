import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AskServiceService {

  constructor( private httpService : HttpService) { }
  
  askhere(body : any ){
   return this.httpService.postJSON('questionAndAnswerNotes/addQuestionAndAnswer',body);
  }
  askIt(body){
    // return this.http.postJSON('questionAndAnswerNotes/addQuestionAndAnswer',body)
  }

}
