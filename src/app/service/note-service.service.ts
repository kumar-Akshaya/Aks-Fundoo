import { Injectable } from '@angular/core';
import { HttpService } from '../service/http.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {
 

  constructor(private httpService : HttpService,private http: HttpClient) { }
   baseUrl = "http://34.213.106.173/api/"

  postcolor(body){
    return this.httpService.postJSON('notes/changesColorNotes',body)
  }
  getUpdatedLabel(id, body) {
    return this.httpService.postJSON('/noteLabels/' + id + '/updateNoteLabel', body)
  }
  getLabels() {
    return this.httpService.encodedGetForm('noteLabels/getNoteLabelList')
  }
  addLabel(body) {
    return this.httpService.postJSON('noteLabels', body)
  }
  goLabel(trashId, labelId, body) {
    return this.httpService.postJSON('notes/' + trashId + '/addLabelToNotes/' + labelId + '/add', body)
  }
  deleteLabel(id) {
    return this.httpService.deletecollaborator('/noteLabels/' + id + '/deleteNoteLabel')
  }
    getcard(){
         return this.httpService.getHttp('notes/getNotesList');
    }
    getTrash(){
      return this.httpService.getHttp('notes/getTrashNotesList')
    }
    deleteNotes(body){
      return this.httpService.postJSON('notes/deleteForeverNotes',body);
    }

    updateNote(data){
     return this.httpService.postJSON('notes/updateNotes', data)
    }
    // deleteNote(body){
    //   console.log(body);
    //   return this.httpService.postJSON('notes/trashNotes',body)
    // }
    
    deleteNote(body) :any{
      console.log(body);
      //const-Type
      const httpOptions ={
        headers : new HttpHeaders({
        'content-Type' : 'application/json',  
        'Authorization' : localStorage.getItem('token')
  
      })
      }
      return this.http.post(this.baseUrl+'notes/trashNotes',body,httpOptions);
    }
    foreverTrash(body) {
      return this.httpService.postJSON('notes/deleteForeverNotes', body)
    }
    postTrash(body) {
      return this.httpService.postJSON('notes/trashNotes', body)
    }

    postArchive(body) {
      return this.httpService.postJSON('notes/archiveNotes', body)
    }

    getArchiveNotes() {
      return this.httpService.encodedGetForm('notes/getArchiveNotesList');
    }

    reminder(body) {
      return this.httpService.postJSON('notes/addUpdateReminderNotes', body)
    }
    getReminder() {
      return this.httpService.getJSON('notes/getReminderNotesList/')
    }
    removeReminder(body) {
      return this.httpService.postJSON('notes/removeReminderNotes', body)
    }

    sendRemainder(data : string){
      return this.httpService.postJSON('notes/addUpdateReminderNote',data);
    }

    postCollaborator(id,body){
      return this.httpService.postJSON('notes/'+ id+'/AddcollaboratorsNotes',body);
    }

    collaboratorDelete(id,userId){
      return this.httpService.deletecollaborator('notes/'+id+'/removeCollaboratorsNotes/'+userId);
    }
    pin(body){
      return this.httpService.postJSON('notes/pinUnpinNotes',body)
    }

    getAllAskedNotes(id : any ){
      console.log("que id is here ", id);
      return this.httpService.getJSON('notes/getNotesDetail/'+id+'');
    }

  
   

}
