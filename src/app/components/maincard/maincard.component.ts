import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {  Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NoteServiceService } from '../../service/note-service.service';
@Component({
  selector: 'app-maincard',
  templateUrl: './maincard.component.html',
  styleUrls: ['./maincard.component.scss']
})
export class MaincardComponent implements OnInit {

  flag = true;
  flag1 = true;
  noteTitle = new FormControl('',[Validators.required,Validators.required]);
  noteContent = new FormControl('',[Validators.required,Validators.required]);
  model : any;
  responce: any;
  color: any = "#fafafa";
  firstName = localStorage.getItem('firstName');
  lastName = localStorage.getItem('lastname');
  email = localStorage.getItem('email');
  userId = localStorage.getItem('userId');
  token = localStorage.getItem('token');
  collaborator : any =[];
  constructor(private httpService: HttpService, private router: Router, private noteService : NoteServiceService,) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigate([''])
  }

 

  @Output() messageEvent = new EventEmitter<string>();
 

   addNote(){
    
     this.flag = !this.flag;
    //  this.noteTitle=document.getElementById('noteTitle').innerHTML;
    //  this.noteContent = document.getElementById('noteContent').innerHTML;
     if(this.noteTitle  || this.noteContent )
     {
      this.model= {
         title : this.noteTitle.value,
         description : this.noteContent.value,
         labelIdList	: '',
         checklist   : '',
         isPined   : false,
         isArchived : false,
         color  : this.color,
         reminder : '',
         collaberators : JSON.stringify(this.collaborator),
       }
        console.log("model data",this.model)
       this.httpService.encodedPostForm('notes/addNotes',this.model).subscribe(data =>{
        console.log("addNotes data",data);
        this.responce = data;
        console.log("id: ",this.responce.id );
        this.messageEvent.emit(this.model);
      },
      err =>
      {
        alert('Something went wrong ');
        console.log("error-------",err);   
      })
     }
     
   }
   Changes($event){ 
     this.color=$event;
     console.log("im reached in main card",this.color);
   }
   pinned(){
    this.flag1 = !this.flag1;
   }

  reverseFlag($event) {
    this.flag = !this.flag;
  
  }


  // save(item) {
  //   this.noteService.postCollaborator(this.id, {
  //     "email": item.email,
  //     "firstName": item.firstName,
  //     "lastName": item.lastName,
  //     "userId": item.userId
  //   })
  //     .subscribe(response => {
  //       console.log("collaborator responace getting here ", response);

  //     })
  // }

  // deleteCollaborator(item) {
  //   this.noteService.collaboratorDelete(this.id, item.userId)
  //     .subscribe(response => {
  //       for (let i = 0; i < this.collaborator.length; i++) {
  //         if (item.userId == this.collaborator[i].userId) {
  //           this.collaborator.splice(i, 1);
  //         }
  //       }
  //     })
  // }

  // search() {
  //   console.log(this.searchWord.value);
  //   this.userService.searchUserList({
  //     "searchWord": this.searchWord.value
  //   })
  //     .subscribe(response => {
  //       this.userList = response['data']['details'];
  //       console.log("searchDatas ", this.searchInput);
  //       console.log("Searchuser List ", this.userList);
  //     })
  // }

  // addLine(user) {
  //   for (let j = 0; j < this.collaborator.length; j++) {
  //     if (this.searchNames == this.collaborator[j].email) {
  //       this.snackBar.open("Collaborator already exists", "fail", {
  //         duration: 3000
  //       })
  //       this.searchNames = null;
  //       return false;
  //     }
  //   }
  //   for (let i = 0; i < this.userList.length; i++) {
  //     if (this.userList[i].email == user) {
  //       this.collaborator.push(this.userList[i]);
  //     }
  //   }
  //    this.searchNames = [];
  // }

  // select(email) {
  //   this.searchNames = email;
  // }

  // users() {
  //   this.collaborator = [];
  //   for (let i = 0; i < this.data1['collaborators'].length; i++) {
  //     this.collaborator.push(this.data1['collaborators'][i]);
  //   }
  //   console.log("collaborator array ", this.collaborator)
  // }

 
}
