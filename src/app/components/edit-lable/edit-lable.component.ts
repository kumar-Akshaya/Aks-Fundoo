/************************************************************************************************
* Execution : 1. default node cmd> dashboard.ts 
* 
* Purpose :editing existing label 
* 
* @file : edit-label.ts
* @module : edit-label.ts - This is optional if expeclictly its an npm or local package
* @author : Akshaya M I <akshayakumarmi97@gmail.com>
* @since : 20-2-2019
*
*************************************************************************************************/

import { Component, OnInit, Inject, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DashboardComponent,  } from '../dashboard/dashboard.component';
import { FormControl, Validators } from '@angular/forms';
import { NoteServiceService } from '../../service/note-service.service';
import { DeleteLableComponent } from '../delete-lable/delete-lable.component';
import { SearchService } from '../../service/searchService/search.service';
@Component({
  selector: 'app-edit-lable',
  templateUrl: './edit-lable.component.html',
  styleUrls: ['./edit-lable.component.scss']
})
export class EditLableComponent implements OnInit {
  private body: any = {}
  private hide = true;
  private editShow: any;
  private input: any = {};
  private labelArray1: any = [];
  private accessToken = localStorage.getItem('token');
  private id = localStorage.getItem('userId');
  label_content=new FormControl('',[Validators.required]);
  
  @ViewChild('labelsId') labelsId: ElementRef;
  @ViewChild('labelId') labelId: ElementRef;
  @Output() newEvent = new EventEmitter();
  @Input() trash;
  constructor( private data1 : SearchService,
    public dialogRef: MatDialogRef< DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog, private dialog: MatDialog,private notesService : NoteServiceService,) {}

  ngOnInit() {
    this.getAllLabels();
  }
 
    onNoClick(): void {
      this.dialogRef.close();
      console.log("im in edit label")
    }

    addLabels() {
      var duplicate = this.labelId.nativeElement.innerHTML;
      for (var i = 0; i < this.labelArray1.length; i++) {
        if (this.labelArray1[i].label == duplicate) {
          alert(' Duplicate Values Not Allowed ')
          return false;
        }
      }
      this.body =
        {
          "label": this.labelId.nativeElement.innerHTML,
          "isDeleted": false,
          "userId": this.id
        }
      this.notesService.addLabel(this.body)
      .subscribe(response => {
          this.getAllLabels();
        }, error => {
        })
    }

    deleteThisLabel(id) {
      const dialogRef = this.dialog.open(DeleteLableComponent, {
        width: '500px',
        height: '100px',
      });
      dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.notesService.deleteLabel(id).subscribe(response => {
              this.getAllLabels();
              this.data1.deleteMessage(true)
            })
        }
      });
    }

    updateTheLabel(id) {
      this.notesService.getUpdatedLabel(id,{
        "label": this.labelsId.nativeElement.innerHTML,
        "isDeleted": false,
        "id": id,
        "userId": this.id
      })
      .subscribe(response => {
        this.getAllLabels();
      })
    }

    edit(id) {
      this.editShow = id;
    }
    clear() {
      this.labelId.nativeElement.innerHTML = '';
    }


    getAllLabels() {
      this.notesService.getLabels()
      .subscribe(data => {
          let newArray = [];
          for (var i = 0; i < data['data']['details'].length; i++) {
            if (data['data']['details'][i].isDeleted == false) {
              newArray.push(data['data']['details'][i])
            }
          }
          newArray.sort(function (a, b) {
            var A = a.label.toLowerCase(), B = b.label.toLowerCase()
            if (A < B) return -1;
            if (A > B) return 1;
            return 0;
          })
          this.labelArray1 = newArray;
        })
    }
  
  }





