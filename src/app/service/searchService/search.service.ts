import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private gridMessage = new BehaviorSubject(false);
  gridCurrentMessage = this.gridMessage.asObservable();



  private messageSource = new Subject();
  private msgSource = new BehaviorSubject(false);
  private idSource = new Subject();
  currentMsg = this.msgSource.asObservable();
  currentMessage = this.messageSource.asObservable();
  idSourceMsg = this.idSource.asObservable();
  viewList = this.messageSource.asObservable();
  constructor() { }
  changeMessage(message: any) {
    console.log("change message ",message)
      this.messageSource.next(message)
    }
    sendMessage(message: boolean) {
      this.messageSource.next(message)
    }
    deleteMessage(message: boolean) {
      this.messageSource.next(message)
    }
    idMessage(message: string){
      this.idSource.next(message);
    }
    changeMsg(message: boolean) {
      this.msgSource.next(message);
    }

    changeGridMsg(message:any){
      console.log(message);
      
      this.gridMessage.next(message)
    }
}







