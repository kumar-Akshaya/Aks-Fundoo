import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { NoteServiceService } from '../../service/note-service.service';
import { DialogData, EditCardComponent } from '../edit-card/edit-card.component'
import { environment } from '../../../environments/environment';
import { UserServiceService } from '../../service/user-service.service';
import { SearchService } from '../../service/searchService/search.service';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {
  searchNames: any = [];
  searchInput = { }
  userList = [];
  id : any ="";
  searchWord = new FormControl('', [Validators.required]);
  collaborator: any = [];
  firstName = localStorage.getItem('firstName');
  lastName = localStorage.getItem('lastName');
  image = localStorage.getItem('image');
  userId = localStorage.getItem('userId');
  email = localStorage.getItem('email');
 
  constructor(public dialogRef: MatDialogRef<CollaboratorComponent>, @Inject(MAT_DIALOG_DATA) public data1: DialogData,
    private noteService: NoteServiceService, public userService: UserServiceService,
    private dialog: MatDialog, private snackBar: MatSnackBar, private dataService: SearchService,  @Inject(MAT_DIALOG_DATA) public data: any)
     {
       this.id=data.id;
     }

  ngOnInit() {
    this.users();
  }

  close(): void {
    this.dialogRef.close();
    // console.log(this.id);
    // const dialogRef = this.dialog.open(EditCardComponent, {
    //   width: 'fit-content',
    //   maxWidth: 'auto',
    //   // data: this.data

    // });
    // dialogRef.afterClosed().subscribe(() => {

    // });
    // this.dialogRef.close();



  }

  save(item) {
    this.noteService.postCollaborator(this.id, {
      "email": item.email,
      "firstName": item.firstName,
      "lastName": item.lastName,
      "userId": item.userId
    })
      .subscribe(response => {
        console.log("collaborator responace getting here ", response);

      })
  }

  deleteCollaborator(item) {
    console.log("item.userId", item.userId, "this.id", this.id);
    
    this.noteService.collaboratorDelete(this.id, item.userId)
      .subscribe(response => {
        for (let i = 0; i < this.collaborator.length; i++) {
          if (item.userId == this.collaborator[i].userId) {
            this.collaborator.splice(i, 1);
          }
        }
      })
  }

  search() {
    console.log(this.searchWord.value);
    this.userService.searchUserList({
      "searchWord": this.searchWord.value
    })
      .subscribe(response => {
        this.userList = response['data']['details'];
        console.log("searchDatas ", this.searchInput);
        console.log("Searchuser List ", this.userList);
      })
  }

  addLine(user) {
    for (let j = 0; j < this.collaborator.length; j++) {
      if (this.searchNames == this.collaborator[j].email) {
        this.snackBar.open("Collaborator already exists", "fail", {
          duration: 3000
        })
        this.searchNames = null;
        return false;
      }
    }
    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i].email == user) {
        this.collaborator.push(this.userList[i]);
      }
    }
     this.searchNames = [];
  }

  select(email) {
    this.searchNames = email;
  }

  users() {
    this.collaborator = [];
    for (let i = 0; i < this.data1['collaborators'].length; i++) {
      this.collaborator.push(this.data1['collaborators'][i]);
    }
    console.log("collaborator array ", this.collaborator)
  }




}
