import { Component, OnInit, Input, Output,ViewChild,AfterViewInit } from '@angular/core';
import { NoteServiceService } from "../../service/note-service.service";
import { EventEmitter } from 'events';
import { SearchService } from '../../service/searchService/search.service';
import { ViewchangeService } from '../../service/viewchange.service';
import { MatDialog } from '@angular/material';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  cards : any [];
  color : any;
  body :  any;
  trashcards : any [];
  cardsArray : any[];
  noteObject : any;
  colorChanges : any;
  istrash = false;
  flag= false;
  private toggle: any = false;
  noteId: any = "";
  childColor: any = "";
  private subscribeView : boolean;
  labelName : any;
  labelId :  any;
  labelArray : any [];
  id: any;
  firstName = localStorage.getItem('firstName');
  constructor(private noteService:NoteServiceService,private data: SearchService, private viewChange:ViewchangeService,
    public dialog : MatDialog) { }
  @Input() Search;
   @Input() card;
  @Output() child=new EventEmitter ();
  @Input() arrayCards;
  @Output() idEvent = new EventEmitter();

   parentmessage : true;
  ngOnInit() {
    this.getAllCard();
    this.getTrashCard();
    this.switchView();
    this.viewChange.subscribeView.subscribe(view =>{
    this.subscribeView = view;
    })
  }

  getAllCard(){
  this.noteService.getcard().subscribe(data=>{
    this.cards=data['data']['data'];
    this.cards.reverse();
     console.log("total cards", this.cards);
     
     this.trashcards = this.cards.filter(function (el) {
      return (el.isDeleted === true);
  });
     this.cardsArray = this.cards.filter(function (el){
       return (el.isDeleted === false && el.isArchived === false && el.isPined === false)
     }) ;  

  //  console.log("cards after trashArray",this.trashcards);
  //  console.log("cards after cardsArray",this.cardsArray);
   
     this.noteObject=this.cards;
   
    console.log('card ', this.noteObject);
    console.log('responce data',data);
  
   
    // console.log("user id ---", this.body);
  })
    
  }

  Changescolor($event){
    this.color=$event;
    console.log("received color change event ", this.color);
    this.getAllCard();
  }

  openCard(items): void {
    const dialogRef = this.dialog.open(EditCardComponent, {
      data: items,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog updated content :', result, '\n updated data', items);
      this.noteService.updateNote({
        "noteId" : items.id , 
        "title"  : items.title,
        "description" : items.description
      }).subscribe( responce =>{
        this.getAllCard();
        console.log("updated responce ", responce);
      },
     err =>{
        console.log(err);
      })

    });
  }

  getTrash(){
  this.flag= !this.flag ;
  }

  switchView() {
    {
      this.data.viewList.subscribe(message => {
        this.toggle = message;
      })
    }
  }

  getTrashCard(){
   
    this.noteService.getTrash().subscribe(data => {
      this.trashcards= data['data']['data'];
      this.trashcards.reverse();
      console.log("trash cards ", this.trashcards);
    },
    error =>{
      // console.log(error);
      console.log("error");

    }
    
    )
  }
  
  update(object){
    if(object.type=='delete'){
      let index=this.cards.indexOf(object);
      this.cards.splice(index,1);
    }else(object.type=='color')
    {
      this.getAllCard();
    }
  }

  cancelLabel(){
      this.labelName = [];
      this.labelId = [];
  }
   
   getAllLabels(){
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

   openCollaboratorPage(notes){
    const dialogRef = this.dialog.open(CollaboratorComponent,{
      width: '500px',
      maxWidth:'auto',
      data: notes
    });
    dialogRef.afterClosed().subscribe(result => {
      // LoggerService.log('The dialog was closed');
    });
   }

  }


 
 

