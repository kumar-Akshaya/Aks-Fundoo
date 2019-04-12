/************************************************************************************************
* Execution : 1. default node cmd> dashboard.ts 
* 
* Purpose :icon list and thier functionalities 
* 
* @file : icon-list.ts
* @module : icon-list.ts - This is optional if expeclictly its an npm or local package
* @author : Akshaya M I <akshayakumarmi97@gmail.com>
* @since : 7-2-2019
*
*************************************************************************************************/

import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { NoteServiceService } from '../../service/note-service.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { FormControl, Validators } from '@angular/forms';
import { AskQuestionComponent } from '../ask-question/ask-question.component';
import { Router } from '@angular/router';
 
export interface askQue {
 
}

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})
export class IconListComponent implements OnInit {

  isDeleted = false;
  clicked = false;
  private accessToken = localStorage.getItem('token');
  model: any;
  labelArray : any [];
  data : string;
  updateObject:any;
  constructor(private noteService: NoteServiceService, private snackBar: MatSnackBar, public dialog: MatDialog,
    public askdialog: MatDialog, private router : Router) { }

  date = new FormControl('', [Validators.required]);
  time = new FormControl('', [Validators.required]);

  ngOnInit() {
    this.getAllLabels();
  }
  @Input() color;
  @Output() colorEmit = new EventEmitter();
  @Output() colorchange = new EventEmitter();
  @Output() childObject = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() deleteCard = new EventEmitter();
  @Output() addEvent = new EventEmitter();
  // @Output() collaborator = new EventEmitter();
  @Input() trash;
  // @Input () delete;
  @Input() card: any;

 
  @Input() reminder;
  @Output() dateEmit = new EventEmitter();
  @Output() remindEmit = new EventEmitter();
newDate={
  date:new Date(),
  time:new Date()
}
object = { id: '', title: "", description: "", isPined: false, isArchived: false, isDeleted: false, color: '#FFFFFF', reminder: [], type: '', label: {} }

  colorArray = [[{ 'color': '#FFFFFF', 'name': 'White' },
  { 'color': '#E53935', 'name': 'Red' },
  { 'color': '#EF6C00', 'name': 'Orange' },
  { 'color': '#FFEB3B', 'name': 'Yellow' }],

  [{ 'color': '#B2FF59', 'name': 'green' },
  { 'color': '#69F0AE', 'name': 'teal' },
  { 'color': '#81D4FA', 'name': 'blue' },
  { 'color': '#0288D1', 'name': 'darkblue' }],

  [{ 'color': '#B39DDB', 'name': 'purple' },
  { 'color': '#F48FB1', 'name': 'pink' },
  { 'color': '#FFAB40', 'name': 'brown' },
  { 'color': '#E0E0E0', 'name': 'gray' }

  ]]

  colorsEdit(id, card) {
    console.log('color is ', id)
    console.log('card is ', card);
    // card.color=id;
    this.colorEmit.emit(id)

    console.log('helw')
    // this.card.type = 'color'

    //        const reqData = {
    //   "color": id,
    //   "noteIdList": [card.id]
    // }


    this.noteService.postcolor({
      "color": id,
      "noteIdList": [card.id]
    }).subscribe(data => {
      console.log("color event reached ", data)
      // localStorage.setItem('colorId', this.color.id)
      this.colorchange.emit(id);
    })

  }



  deleteNote(card) {
    this.isDeleted = !this.isDeleted;
    // console.log("isDeleted", this.isDeleted);
    console.log('deletino', card);
    console.log("noteIdList", card.id);

    this.noteService.deleteNote({
      "isDeleted": true,
      "noteIdList": [card.id],

    }).subscribe(dataTrash => {
      console.log("deleted responce", dataTrash);
      this.childObject.emit(card);
      // this.deleteCard.emit({
      // })
    },
      err => {
        //  alert('Error occured');
        console.log(err);
      })

  }

  message = "Note Archieved ";
  action = "Undo";

  archive(message: string, action: string) {
    this.snackBar.open(this.message, this.action), {
      duration: 4000
    }
  }
  @Output() archiveEmit = new EventEmitter();

  addArchive() {
    console.log("archive called", this.card.id);
    this.noteService.postArchive({
      "isArchived": true,
      "noteIdList": [this.card.id]
    })
    .subscribe(data => {
      this.archiveEmit.emit({
      })
    })
  }

  unArchive() {
    this.noteService.postArchive({
      "isArchived": false,
      "noteIdList": [this.card.id]
    })
    .subscribe(data => {
      this.archiveEmit.emit({
      })
    })
  }

  openCollaborator( ) {
    console.log("note id is this ", this.card.id);
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '500px',
      data : this.card,
      // this.collaborator.emit(this.card.id)
    })
    dialogRef.afterClosed().subscribe(result => {

    })
  }


  timeMenu() {
    this.clicked = !this.clicked;
  }

  dataSave() {
    this.model = {
      reminder: [this.date.value],
    }
    console.log("date and time ", this.date.value, this.time.value)
    this.noteService.sendRemainder(this.model)
      .subscribes(result => {

        console.log(this.model);

      },
        err => {
          console.log("erorr-------", err);

        })
  }

  goAndGetLabel(label) {
    this.addEvent.emit(label);
    this.noteService.goLabel(this.trash.id,label.id,
      { "noteId": this.trash.id,"lableId": label.id })
      .subscribe(data => {
        this.deleteCard.emit({
        })
      })
  }

  getAllLabels(){
    let newArray = [];
    this.noteService.getLabels()
    .subscribe(data => {
      for (var i = 0; i < data['data']['details'].length; i++) {
        if (data['data']['details'][i].isDeleted == false){
          newArray.push(data['data']['details'][i])
        }
      }
      this.labelArray = newArray;
    })
  }

  

  askQue() : void  {
   
    localStorage.setItem("noteId",this.card.id);
    this.router.navigate(['dashboard/askQue/'+this.card.id]);
  
  }


   /**
   * @description this method is for add the reminder in note for today date
   * @param card whole card object
   * @emits  emit an event for parent note for add reminder in display card
   * @returns nothing
   */
  //add reminder today 
  addReminderTody(card) {
    console.log(card,'card in 234');
    
    let today = new Date;
    today.setHours(20);
    today.setMinutes(0);
    try {
      if (card != undefined) {
        console.log('card in 115 in add reminder', card.reminder[0] = today)
        let object = {
          "noteIdList": [card.id],
          "reminder": [today],
          "type": "reminder"
        }
        this.addReminderService(object);

      } else if (this.updateObject) {
        console.log('item in 126 ', this.updateObject)
        let object = {
          "noteIdList": [this.updateObject.id],
          "reminder": [today],
          "type": "reminder"
        }
        this.childObject.emit(object);
        this.addReminderService(object);
      } else {

        this.object.type = 'reminder'
        this.object.reminder[0] = today;
        this.childObject.emit(this.object);
      }

    } catch (error) {
      console.log('error in add reminder today');

    }


  }
  /**
   * @description this method is for add the reminder in note for tomorrow date
   * @param card whole card object
   * @emits  emit an event for parent note for add reminder in display card
   * @returns nothing
   */
  addReminderTomorrow(card) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(8);
    tomorrow.setMinutes(0);
    console.log(tomorrow)
    try {
      if (card != undefined) {
        console.log('card in 115 in add reminder', card.reminder[0] = tomorrow)
        let object = {
          "noteIdList": [card.id],
          "reminder": [tomorrow],
          "type": "reminder"
        }
        this.addReminderService(object);

      } else if (this.updateObject) {
        console.log('item in 126 ', this.updateObject)
        let object = {
          "noteIdList": [this.updateObject.id],
          "reminder": [tomorrow],
          "type": "reminder"
        }
        this.childObject.emit(object);
        this.addReminderService(object);
      } else {

        this.object.type = 'reminder'
        this.object.reminder[0] = tomorrow;
        this.childObject.emit(this.object);
      }
    } catch (error) {
      console.log('error in add reminder method tomorrow');

    }



  }
  /**
   * @description this method is for add the reminder in note for any date
   * @param card whole card object
   * @emits  emit an event for parent note for add reminder in display card
   * @returns nothing
   */
  addReminder(card) {
    this.newDate.date.setSeconds(0)
    console.log('date in add reminder',this.newDate.date)
    try {
      let time = this.newDate.time + "";
      console.log('time in line 184 in icon', time)
      if (time.length < 9) {
        console.log((time.substring(6, 8)), '   print');
        if (time.substring(6, 8) === 'pm') {
          console.log('in pm run');
          this.newDate.date.setHours(Number(time.substring(0, 2)) + 12);
          console.log(this.newDate.date, 'date in 190')

        }
        else
        // here i have changed
          this.newDate.date.setHours(Number(time.substring(0, 2)));

        this.newDate.date.setMinutes(Number(time.substring(3, 5)));


      } else if (time.length > 10) {
        console.log(this.newDate.date)
        this.newDate.date.setHours(Number(time.substring(16, 18)));
        this.newDate.date.setMinutes(Number(time.substring(19, 21)));

      }

      console.log('date select is ', this.newDate.date, '   time select is ', this.newDate.time, '    ', time.length, 'full is ');
      if (card != undefined) {
        card.reminder[0] = this.newDate.date;
        console.log('card in 115 in add reminder', card.reminder[0] )
        let object = {
          "noteIdList": [card.id],
          "reminder": [this.newDate.date],
          "type": "reminder"
        }
        this.childObject.emit(object);
        this.addReminderService(object);

      } else if (this.updateObject) {
        console.log('item in 126 ', this.updateObject)
        let object = {
          "noteIdList": [this.updateObject.id],
          "reminder": [this.newDate.date],
          "type": "reminder"
        }
        console.log('line 235 in add note ', object);
        this.childObject.emit(object);
        this.addReminderService(object);
      } else {
        console.log('in else part in 239')
        this.object.type = 'reminder'
        this.object.reminder[0] = this.newDate.date;
        this.childObject.emit(this.object);
      }
    } catch (error) {
      console.log('error in add reminder method');

    }
  }
  /**
   * @description this method is for call note service to add reminder
   * @param body 
   * @returns nothing
   */
  addReminderService(body) {
    try {
      this.noteService.reminder(body).subscribe(data => {
        console.log('reminder added successfully', data);
        this.childObject.emit({});

      }, err => {
        console.log('reminder have error', err);
      })
    } catch (error) {
      console.log('error in 254 line in icon ', error)
    }

  }
     

}










