import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { askQue } from '../icon-list/icon-list.component';
import { Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { AskServiceService } from '../../service/askService /ask-service.service';
import { NoteServiceService } from '../../service/note-service.service';


@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit {
  private answer;
  private reply = 0;
  private title: any;
  private description: any = [];
  private labelList: any = [];
  private checkList = [];
  private queArray: any[];
  private isQuestionAsked: any = 0;
  private message;
  private parentId;
  private liked = 0;
  private userReply = 0;
  private show = false;
  private hide = 0;
  private editorContent: string;
  private result;
  firstName = localStorage.getItem('firstName');
  noteId = localStorage.getItem('noteId')
  private url = this.router.url;
  private askedNote = this.url.split('/');



  ngOnInit() { }
  constructor(private httpService: HttpService, private router: Router, private noteService: NoteServiceService, private askService: AskServiceService) { }

  close() {
    this.router.navigate(['dashboard', 'content']);
  }

  viewReply() {
    this.show = true;
    this.hide = 1;
  }

  hideReply() {
    this.show = false;
    this.hide = 0;
  }

  getAllAskedNotes() {
    console.log("this.askNotes", this.noteId);
    this.noteService.getAllAskedNotes(this.noteId)
      .subscribe(response => {
        this.result = response['data']['data'][0];
        this.title = this.result.title;
        this.description = response['data']['data'][0].description;
        this.queArray = this.result["questionAndAnswerNotes"];
        console.log("que result ", this.result);
        console.log("que title ", this.result.title);
        console.log("que description ", this.description);
        console.log("que queArray ", this.queArray);

        if (this.result['questionAndAnswerNotes'][0] != undefined) {
          this.message = this.result['questionAndAnswerNotes'][0].message;
          this.parentId = this.result['questionAndAnswerNotes'][0].id;
        }
        for (var i = 0; i < response['data']['data'][0].noteCheckLists.length; i++) {
          if (response['data']['data'][0].noteCheckLists[i].isDeleted == false) {
            this.checkList.push(response['data']['data'][0].noteCheckLists[i])
          }
        }
        console.log("note answers are here", this.message);
        console.log("notes parent id is here ", this.parentId)
        console.log("checkList array ", this.checkList);
      })
  }

  askQuestion() {
    let displayQuestion = {
      "message": this.editorContent,
      "notesId": this.noteId
    }
    console.log("message here ", this.editorContent, "noteId", this.askedNote);
    this.askService.askhere(displayQuestion)
      .subscribe(data => {
        console.log('askQuestion', data);
        this.message = this.editorContent;
        this.getAllAskedNotes();
      })
  }

  replyNow() {
    this.reply = 1;
  }

  // getAskedNotes() {
  //   this.notesService.getAskedNotes(this.askedNote[3])
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(data => {
  //       this.result = data['data']['data'][0];
  //       this.title = this.result.title;
  //       this.description = data['data']['data'][0].description;
  //       this.qArray = this.result["questionAndAnswerNotes"];
  //       this.replyArray = this.result["questionAndAnswerNotes"][0];
  //       if (this.result['questionAndAnswerNotes'][0] != undefined) {
  //         this.message = this.result['questionAndAnswerNotes'][0].message;
  //         this.parentId = this.result['questionAndAnswerNotes'][0].id;
  //       }
  //       for (var i = 0; i < data['data']['data'][0].noteCheckLists.length; i++) {
  //         if (data['data']['data'][0].noteCheckLists[i].isDeleted == false) {
  //           this.checkList.push(data['data']['data'][0].noteCheckLists[i])
  //         }
  //       }
  //       LoggerService.log('response', data)
  //     })
  // }

}
