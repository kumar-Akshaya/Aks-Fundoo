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
    this.router.navigate(['dashboard','askQue']);
    localStorage.setItem("noteId",this.card.id);
  
  }

}










