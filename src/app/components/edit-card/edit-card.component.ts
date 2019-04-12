/************************************************************************************************
* Execution : 1. default node cmd> dashboard.ts 
* 
* Purpose :editing title and description of note
* 
* @file : edit-card.ts
* @module : edit-card.ts - This is optional if expeclictly its an npm or local package
* @author : Akshaya M I <akshayakumarmi97@gmail.com>
* @since : 15-2-2019
*
*************************************************************************************************/

import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteServiceService } from '../../service/note-service.service';
import { FormControl } from '@angular/forms';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

export interface DialogData {
  title: string;
  description: string;
  id: string;
  label: string;
}

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {
  cards: any[];
  trashcards: any[];
  cardsArray: any[];
  title: any = "";
  description: any = "";
  id: any = "";
  label: any = "";
  constructor(public dialogRef: MatDialogRef<EditCardComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = new FormControl(data.title);
    this.description = new FormControl(data.description);
    this.id = data.id;
    this.label = data.label;
  }


  ngOnInit() {
  }

  save() {
    this.data.title = this.title.value;
    this.data.description = this.description.value;
    this.data.id = this.id.value;
    this.data.label = this.label.value;
    this.dialogRef.close({ data: this.data });
  }


  openCollaboratorPage(data) {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '500px',
      maxWidth: 'auto',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.dialogRef.close();
  }




}
