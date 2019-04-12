import { Component, OnInit, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { NoteServiceService } from "../../service/note-service.service";
import { EventEmitter } from 'events';
import { SearchService } from '../../service/searchService/search.service';
import { ViewchangeService } from '../../service/viewchange.service';
import { MatDialog } from '@angular/material';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  cards: any[];
  color: any;
  body: any;
  trashcards: any[];
  cardsArray: any[];
  pinArray = [];
  unPinArray = [];
  noteObject: any;
  colorChanges: any;
  istrash = false;
  flag = false;
  private toggle: any = false;
  noteId: any = "";
  childColor: any = "";
  private subscribeView: boolean;
  labelName: any;
  labelId: any;
  labelArray: any[];
  id: any;
  firstName = localStorage.getItem('firstName');
  constructor(private noteService: NoteServiceService, private data: SearchService, private viewChange: ViewchangeService,
    public dialog: MatDialog, private router: Router) { }
  @Input() Search;
  @Input() card;
  @Output() child = new EventEmitter();
  @Input() arrayCards;
  @Output() idEvent = new EventEmitter();
  @Output() trashEvent = new EventEmitter();
  view = false;
  parentmessage: true;
  gridClass = {
    list: this.view,
    grid: !this.view

  }


  ngOnInit() {
    this.getAllCard();
    this.getTrashCard();
    this.switchView();
    this.data.gridCurrentMessage.subscribe(data => {
      this.view = data;
      this.gridClass.list = this.view;
      this.gridClass.grid = !this.view;

    })
    this.viewChange.subscribeView.subscribe(view => {
      this.subscribeView = view;
    })
  }

  getAllCard() {
    this.noteService.getcard().subscribe(data => {
      this.cards = data['data']['data'];
      this.cards.reverse();
      console.log("total cards", this.cards);

      this.trashcards = this.cards.filter(function (el) {
        return (el.isDeleted === true);
      });
      this.unPinArray = this.cards.filter(function (el) {
        return (el.isDeleted === false && el.isArchived === false && el.isPined === false)
      });
      this.pinArray = this.cards.filter(function (el) {
        return (el.isDeleted === false && el.isArchived === false && el.isPined === true)
      });

      //  console.log("cards after trashArray",this.trashcards);
      //  console.log("cards after cardsArray",this.cardsArray);

      this.noteObject = this.cards;

      console.log('card ', this.noteObject);
      console.log('responce data', data);
      // console.log("user id ---", this.body);
    })
  }

  Changescolor($event) {
    this.color = $event;
    console.log("received color change event ", this.color);
    this.getAllCard();
  }

  openCard(items): void {
    this.data.changeMessage(items);
    const dialogRef = this.dialog.open(EditCardComponent, {
      data: items,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog updated content :', result, '\n updated data', items);
      this.noteService.updateNote({
        "noteId": items.id,
        "title": items.title,
        "description": items.description
      }).subscribe(responce => {
        this.getAllCard();
        // this.trashEvent.emit({});
        console.log("updated responce ", responce);
      },
        err => {
          console.log(err);
        })
    });
  }

  getTrash() {
    this.flag = !this.flag;
  }

  switchView() {
    {
      this.data.viewList.subscribe(message => {
        this.toggle = message;
      })
    }
  }

  getTrashCard() {

    this.noteService.getTrash().subscribe(data => {
      this.trashcards = data['data']['data'];
      this.trashcards.reverse();
      console.log("trash cards ", this.trashcards);
    },
      error => {
        // console.log(error);
        console.log("error");
      })
  }

  update(object) {
    if (object.type == 'delete') {
      let index = this.cards.indexOf(object);
      this.cards.splice(index, 1);
    } else if (object.type == 'color') {
      this.getAllCard();
    } else {
      this.getAllCard();
    }
  }

  cancelLabel() {
    this.labelName = [];
    this.labelId = [];
  }

  getAllLabels() {
    let newArray = [];
    this.noteService.getLabels()
      .subscribe(data => {
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            newArray.push(data['data']['details'][i])
          }
        }
        this.labelArray = newArray;
      })
  }

  instantLabel(event) {
    if (this.labelName.indexOf(event) < 0) {
      this.labelId.push(event.id);
      this.labelName.push(event);
    } else {
      this.labelId.splice(this.labelId.indexOf(event), 1)
      this.labelName.splice(this.labelName.indexOf(event), 1)
    }
  }

  openCollaboratorPage(notes) {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '500px',
      maxWidth: 'auto',
      data: notes
    });
    dialogRef.afterClosed().subscribe(result => {
      // LoggerService.log('The dialog was closed');
    });
  }

  removeReminder(item) {
    try {
      console.log('item', item);
      item.reminder.pop();
      if (item != undefined) {
        let object = {
          "noteIdList": [item.id]
        }
        this.removeReminderService(object);

      }
    } catch (error) {
      console.log('error in removeReminder in display component');

    }

  }

  removeReminderService(body) {
    try {

      this.noteService.removeReminder(body).subscribe(data => {
        console.log('data after remove rememinder', data);
      }, err => {
        console.log('err after remove rememinder', err);

      })
    } catch (error) {
      console.log('error in line 409 ', error);
    }

  }

  pin(item, index) {
    this.unPinArray.splice(index, 1);
    this.pinArray.unshift(item);
    this.noteService.pin({
      "noteIdList": [item.id],
      "isPined": true
    }).subscribe(data => {
      console.log("pinned details----", data)
    })
  }
  unPin(item, index) {
    this.pinArray.splice(index, 1);
    this.unPinArray.unshift(item);
    this.noteService.pin({
      "noteIdList": [item.id],
      "isPined": false
    }).subscribe(data => {
      console.log("unpinned data----", data)
    })
  }



  goToQA(notes) {
    this.router.navigate(['dashboard/askQue/' + notes])
  }

}





