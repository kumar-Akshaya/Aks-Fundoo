import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { askQue } from '../icon-list/icon-list.component';
import { Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { AskServiceService } from '../../service/askService/ask-service.service';
import { NoteServiceService } from '../../service/note-service.service';
import { Question, reply } from "../../model/QA";
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit {
  public QuestionModel: Question;
  public replyModel: reply;
  constructor(public route: Router, public noteService: NoteServiceService, public QAService: AskServiceService,

    private snackBar: MatSnackBar) { }
  //  cardId
  cardToken = localStorage.getItem('noteId')
  title = '';
  description = '';
  card: any;
  editorContent: any;
  secondId = '';
  questions = ''
  AnswerArray = [];
  question: any;
  user: any;
  rate = 5;
  htmlField: any;
  parentId = ''
  likeCount = 3;
  showId = '';
  likeObject = { "userId": "5c67f5371524250040082dba", "like": true };
  imgUrl = 'http://34.213.106.173/';
  showFirstReply = false;
  showSecondReply = false;
  showSecondId = '';
  showEditorId = false;
  ngOnInit() {
    console.log(this.cardToken);
    this.getCardDetails();

  }
  /**
 * @description this method is for get card detail by id
 * @returns nothing
 */
  getCardDetails() {
    try {
      this.noteService.getAllAskedNotes(this.cardToken).subscribe(data => {
        console.log('data ', data['data']['data']);
        this.card = data['data']['data'];
        this.title = this.card[0].title;
        this.user = this.card[0].user;
        this.description = this.card[0].description;
        this.question = this.card[0].questionAndAnswerNotes[0];
        console.log(this.question);
        
        this.AnswerArray = this.card[0].questionAndAnswerNotes;
        if (this.card[0].questionAndAnswerNotes[0] != undefined)
          this.parentId = this.card[0].questionAndAnswerNotes[0].id;
        this.AnswerArray.splice(0, 1);
        console.log(this.question);
        console.log(this.AnswerArray);
        if (this.AnswerArray != null)
          for (let i = 0; i < this.AnswerArray.length; i++) {
            console.log(this.AnswerArray[i].id, 'Id and parent id', this.AnswerArray[i].parentId);
          }

      }, err => {
        console.log('error ', err);

      })
    } catch (error) {
      console.log('error in getCardDetails in askQuestion ', error);

    }

  }

  /**
   * @description :when use ask the question and hit submit button then this method run 
   */
  submit() {
    try {
      this.showEditorId = false;
      console.log(this.editorContent, '   data');
      this.QuestionModel = new Question();
      this.QuestionModel.createdDate = new Date();
      this.QuestionModel.like = [];
      this.QuestionModel.rate = [];
      this.QuestionModel.user = this.user;
      this.QuestionModel.message = this.editorContent;
      console.log(this.QuestionModel);
      this.question = this.QuestionModel;
      const obj = {
        message: this.editorContent,
        notesId: this.cardToken
      }
      this.QAService.askhere(obj).subscribe(data => {
        console.log(data);
        this.openSnackBar('Question Added successfully', '');
        this.editorContent = '';
      }, err => {
        console.log(err);

      })
    } catch (error) {
      console.log('error in submit method in ask component');

    }
  }


  /**
   * @description :this method is for when user press close button then it navigate the page to notes component only
   */
  close() {
    this.route.navigate(['../dashboard'])
  }

  /**
   * @description :this method is for open the snackbar
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  replyIt(id) {
    console.log(id);

    this.replyModel = new reply();
    this.showEditorId = false;
    this.replyModel.message = this.editorContent;
    this.replyModel.id = id;
    if (this.editorContent.length < 30 && this.question != undefined) {
      this.openSnackBar('Not a proper Answer', '');
      this.editorContent = '';
      return;
    }
    console.log(this.replyModel);

    this.replyService(this.replyModel);
  }


  replyService(body) {
    this.QAService.replyAnswer(body).subscribe(data => {
      console.log('data after reply the question', data);
      this.openSnackBar('Thankyou For Your Answer', '');

    }, err => {
      console.log('err after reply ', err);

    })
  }
  /**
   * @description this will show thee editor to add answer
   * @param index 
   */
  setId(index) {
    console.log('data is ', index);
    console.log('id is ', index.id);

    this.showId = index.id;
  }
  setSecondId(index) {
    this.secondId = index.id;
  }
  showSecondReplyMethod(id) {
    this.showSecondReply = true;
    this.showSecondId = id;
  }
  hideSecondReplyMethod(id) {
    if (this.showSecondId == id) {
      this.showSecondId = '';
    }
  }
  showEditor(question) {
    console.log(question);

    this.showEditorId = question.id
  }


}
