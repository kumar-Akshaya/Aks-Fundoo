import { Component, OnInit, Input } from '@angular/core';
import { NoteServiceService } from '../../service/note-service.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  trashcards : any[];
  childColor : any;
  allcards : any [] ; 
  constructor( private noteService : NoteServiceService) { }

  ngOnInit() {
    this.getTrashCard();
    console.log("items ")
  }
@Input() card ;
  getTrashCard(){
    this.noteService.getTrash().subscribe(data => {
      this.trashcards= data['data']['data'];
      this.trashcards.reverse();
      console.log("trash cards ", this.trashcards);
    },
    err =>{
      console.log(err);
    }
    )
  }

  deleteForever(card) {
    console.log("card ----", card)
  this.noteService.foreverTrash({
    "isDeleted": false,
    "noteIdList": [card]
  })
  .subscribe(data => {
    this.getTrashCard()
  })
}

postToTrash(card) {
  this.noteService.postTrash( {
    "isDeleted": false,
    "noteIdList": [card]
  })
  .subscribe(data => {
    this.getTrashCard()
  })
}

}
