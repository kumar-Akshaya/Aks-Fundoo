import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AskServiceService {

  constructor(private httpService : HttpService) { }
url='questionAndAnswerNotes/';
  askhere(body : any){
    return this.httpService.postJSON(this.url+'addQuestionAndAnswer',body);
  }
  replyAnswer(body){
    return this.httpService.postJSON(this.url+'reply/'+body.id,body);
  }
  
  liked(body){
    return this.httpService.postJSON(this.url+'like/'+body.id,body);
  }
  rating(body){
    return this.httpService.postJSON(this.url+'rate/'+body.id,body);  }

}
