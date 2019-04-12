/************************************************************************************************
* Execution : 1. default node cmd> dashboard.ts 
* 
* Purpose :dashboard to fundoo
* 
* @file : delete-label.ts
* @module : delete-label.ts - This is optional if expeclictly its an npm or local package
* @author : Akshaya M I <akshayakumarmi97@gmail.com>
* @since : 10-2-2019
*
*************************************************************************************************/


import { Component, OnInit, Inject } from '@angular/core';
import { EditLableComponent } from '../edit-lable/edit-lable.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-lable',
  templateUrl: './delete-lable.component.html',
  styleUrls: ['./delete-lable.component.scss']
})
export class DeleteLableComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditLableComponent>,
  ) { }
  // @Inject(MAT_DIALOG_DATA) private data: DialogData

  ngOnInit() {
  }
  cancel() {
    this.dialogRef.close();
  }
}
